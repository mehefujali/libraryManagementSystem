import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;
    const newBook = await Book.create(bookBody);
    res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Server error",
      Error: error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Server error",
      Error: error,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Server error",
      Error: error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const newUpdateBook = req.body;
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    
    if (!book) {
       res.status(404).json({
        success: false,
        message: "Book not found",
        error: `No book found with ID: ${newUpdateBook.book}`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, newUpdateBook, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Server error",
      Error: error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(bookId);
    res.status(204).json({
      success: true,
      message: "Book deleted successfully",
      data: deleteBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Server error",
      Error: error,
    });
  }
};
