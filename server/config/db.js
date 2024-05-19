import mongoose from "mongoose";
import "dotenv/config";

export const database = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
