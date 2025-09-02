import mongoose from "mongoose";
export const connectDb = async () =>
  await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("DB connected Successfully");
    })
    .catch(() => {
      "Cannot Connect To DB";
    });
