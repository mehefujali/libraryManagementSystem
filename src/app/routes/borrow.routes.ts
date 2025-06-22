import express from 'express'
import { borrowBook, getBorrowedBooksSummary } from '../controllers/borrow.controller'



export const borrowRouter = express.Router()

borrowRouter.post("/" , borrowBook)
borrowRouter.get("/", getBorrowedBooksSummary)