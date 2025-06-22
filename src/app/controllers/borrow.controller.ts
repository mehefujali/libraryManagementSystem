import { Request, Response } from "express";
import { IBorrow } from "../interface/borrow.interface";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const newBorrowBook: IBorrow = req.body;

    const book = await Book.findById(newBorrowBook.book);
    if (!book) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
      });
    }

    if (book.copies < newBorrowBook.quantity) {
      return res.status(400).json({
        status: false,
        message: "Not enough copies available",
      });
    }

    const borrow = await Borrow.create(newBorrowBook);

    // Update book copies
    await Book.findByIdAndUpdate(book._id, {
      $inc: { copies: -newBorrowBook.quantity },
    });

    res.status(200).json({
      status: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const BorrowedBooks = async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await Borrow.find()
      .populate('book', 'title author isbn copies');

    res.status(200).json({
      status: true,
      message: "Borrowed books retrieved successfully",
      data: borrowedBooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
