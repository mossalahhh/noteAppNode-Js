import User from "../../../Db/models/user_model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword)
      return res.json({ success: false, message: "password Must be Match" });

    const isUser = await User.findOne({ email });
    if (isUser)
      return res.json({
        success: false,
        message: "This Email is already exists",
      });

    const hashPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALATROUNDS)
    );

    const user = await User.create({ name, email, password: hashPassword });
    return res.json({
      success: true,
      results: user,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        success: false,
        message: "This Email is already exists",
      });
    }
    return res.json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.json({ success: false, message: "password must be match" });

    return res.json({
      success: true,
      results: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      results: error.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOneAndDelete({ email });
  if (!user)
    return res.json({
      success: false,
      message: "User Not Found Or Invalid email",
      error: error.code,
    });

  return res.json({
    success: true,
    message: "User Deactivated Successfully!",
  });
};

export const allUsers = async (req, res, next) => {
  const user = await User.find({}, { password: 0 });
  return res.json({
    success: true,
    results: user,
  });
};

export const updatePassword = async (req, res, next) => {
  const { email } = req.params;
  const { password } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { password } },
    { new: true }
  );

  if (!user)
    return res.json({
      success: false,
      message: "User Not Found Or Invalid email",
      error: error.code,
    });

  return res.json({
    success: true,
    message: "Password Updated Successfully",
  });
};
