import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller";

export const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.put("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook);