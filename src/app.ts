import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { mongoDB } from "./config/db";
import { bookRouter } from "./app/routes/books.routes";
import { borrowRouter } from "./app/routes/borrow.routes";

configDotenv();
mongoDB();

//app
export const app: Application = express();

// Middle ware

app.use(express.json());

// APIS

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: true,
      message: "Server is running",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: "Server error ",
      Error: error,
    });
  }
});
