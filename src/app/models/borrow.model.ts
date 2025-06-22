import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Minimum quantity must be 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function(value: Date) {
          return value > new Date();
        },
        message: "Due date must be in the future"
      }
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre('save', async function(next) {
  const Book = mongoose.model('Book');
  const book = await Book.findById(this.book);
  
  if (!book) {
    throw new Error('Book not found');
  }
  
  if (book.copies < this.quantity) {
    throw new Error('Not enough copies available');
  }
  
  await Book.findByIdAndUpdate(this.book, {
    $inc: { copies: -this.quantity }
  });
  
  const updatedBook = await Book.findById(this.book);
  if (updatedBook && updatedBook.copies === 0) {
    await Book.findByIdAndUpdate(this.book, { available: false });
  }
  
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
