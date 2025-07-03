import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/libraryManagementSystem";

export const mongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
     
      retryWrites: true,
      w: 'majority'
    });
   
    console.log("MONGODB CONNECTED");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
