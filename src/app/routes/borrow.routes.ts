import express from 'express'
import { borrowBook } from '../controllers/borrow.controller'



export const borrowRouter = express.Router()

borrowRouter.post("/" , borrowBook)