import express from "express";
import { createBook } from "../controllers/book.controller";

export const bookRouter = express.Router();

bookRouter.post("/", createBook);
