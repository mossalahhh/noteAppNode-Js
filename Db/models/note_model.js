import { Schema, model, Types } from "mongoose";

const noteSchema = new Schema({
  content: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Note = model("note", noteSchema);

export default Note;
