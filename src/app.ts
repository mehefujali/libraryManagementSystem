import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { mongoDB } from "./config/db";
import { bookRouter } from "./app/routes/books.routes";
import { borrowRouter } from "./app/routes/borrow.routes";

configDotenv();
mongoDB();

//app
export const app: Application = express();

// Middle ware

app.use(cors());
app.use(express.json());

// APIS

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Library Management System API is running",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
});
