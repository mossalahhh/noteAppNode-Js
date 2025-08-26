import Note from "../../../Db/models/note_model.js";
import User from "../../../Db/models/user_model.js";

export const createNote = async (req, res) => {
  const { content, userId } = req.body;
  try {
    if (!content) {
      return res.json({ success: false, message: "Content is required" });
    }

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const note = await Note.create({ content, userId });
    return res.json({ success: true, results: note });
  } catch (error) {
    return res.json({ success: false, message: "Something went wrong", error });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { isCompleted, userId } = req.body;

  try {
    //check if user exists
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User Not Found" });

    //check if user owner this note by id
    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { isCompleted },
      { new: true }
    );
    if (!note)
      return res.json({
        success: false,
        message: "Note or user does not exists ",
      });

    return res.json({
      success: true,
      message: "Note status Updated Successfully",
      results: note,
    });
  } catch (error) {
    return res.json({ success: false, message: "Something went wrong", error });
  }
};

export const allNotes = async (req, res) => {
  const note = await Note.find({}, { content: 1, _id: 0 }).populate({
    path: "userId",
    select: "email name",
  });

  return res.json({ success: true, note });
};

export const userNotes = async (req, res) => {
  const { id } = req.params;

  const note = await Note.find({ userId: id });
  return res.json({ success: true, results: note });
};
