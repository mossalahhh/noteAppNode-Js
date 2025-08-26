import mongoose from "mongoose";
export const connectDb = async () =>
  await mongoose
    .connect("mongodb://127.0.0.1:27017/notes")
    .then(() => {
      console.log("DB connected Successfully");
    })
    .catch(() => {
      "Cannot Connect To DB";
    });
