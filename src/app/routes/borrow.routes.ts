import express from 'express'
import { borrowBook, BorrowedBooks } from '../controllers/borrow.controller'



export const borrowRouter = express.Router()

borrowRouter.post("/" , borrowBook)
borrowRouter.get("/", BorrowedBooks)