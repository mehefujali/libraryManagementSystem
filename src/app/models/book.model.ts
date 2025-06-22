import { model, Schema, Document } from "mongoose";
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
      min: [0, "Copies must be a positive number"],
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

bookSchema.pre('save', function(next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

bookSchema.methods.updateAvailability = function() {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  return this.save();
};

bookSchema.statics.findByGenre = function(genre: string) {
  return this.find({ genre });
};

bookSchema.statics.findAvailableBooks = function() {
  return this.find({ available: true, copies: { $gt: 0 } });
};

export const Book = model<IBook>("Book", bookSchema);
