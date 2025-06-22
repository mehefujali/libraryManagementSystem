import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookBody = req.body;
    const newBook = await Book.create(bookBody);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
      return;
    }
    if (error.code === 11000) {
      res.status(400).json({
        message: "ISBN already exists",
        success: false,
        error: error,
      });
      return;
    }
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    
    let query: any = {};
    if (filter) {
      query.genre = filter;
    }
    
    const sortOrder = sort === 'desc' ? -1 : 1;
    const limitNum = parseInt(limit as string);
    
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(limitNum);
      
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    
    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: `No book found with ID: ${bookId}`,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;
    const bookId = req.params.bookId;
    
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: `No book found with ID: ${bookId}`,
      });
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
      return;
    }
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    
    if (!deletedBook) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: `No book found with ID: ${bookId}`,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};
