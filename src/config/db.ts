import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const mongoDB = () => {
  try {
    mongoose.connect(
      MONGO_URI || "mongodb://localhost:27017/libraryManagementSystem"
    );
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.error(error);
  }
};
