import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("MongoDB is connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
};
