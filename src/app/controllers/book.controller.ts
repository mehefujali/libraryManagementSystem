import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;
    const newBook = await Book.create(bookBody);
    res.status(201).json({
      status: true,
      message: "Book created success",
      newBook,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      Message: "Server error ",
      Error: error,
    });
  }
};
