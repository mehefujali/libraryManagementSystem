import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [1, "There must be at least 1 copy"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);


export const Book = model<IBook>("Book", bookSchema);
