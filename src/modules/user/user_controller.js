import User from "../../../Db/models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    // return res.json({ success: false, message: "password Must be Match" });
    return next(new Error("password Must be Match"));
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    // return res.json({
    //   success: false,
    //   message: "This Email is already exists",
    // });
    return next(new Error("This Email is already exists"));
  }
  const hashPassword = bcrypt.hashSync(
    password,
    Number(process.env.SALATROUNDS)
  );

  const user = await User.create({ name, email, password: hashPassword });
  return res.json({
    success: true,
    results: user,
  });
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    // return res.json({
    //   success: false,
    //   message: "Invalid Email",
    // });
    return next(new Error("Invalid Email"));
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    // return res.json({ success: false, message: "Invalid password" });
    return next(new Error("Invalid password"));
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKENKEY,
    { expiresIn: "60s" }
  );

  return res.json({
    success: true,
    results: token,
  });
};

export const profile = async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    // return res.json({ success: false, message: "User Not Found" });
    return next(new Error("User Not Found"));
  }

  return res.json({ success: true, user });
};

export const deleteUser = async (req, res, next) => {
  // const {email} = req.params
  const email = req.user.email;
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    // return res.json({
    //   success: false,
    //   message: "User Not Found Or Invalid email",
    //   error: error.code,
    // });
    return next(new Error("User Not Found Or Invalid email"));
  }
  return res.json({
    success: true,
    message: "User Deactivated Successfully!",
  });
};

export const allUsers = async (req, res, next) => {
  const user = await User.find({}, { password: 0 });

  if (!user) {
    // return res.json({ success: false, message: "User Not Found" });
    return next(new Error("User Not Found"));
  }

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

  if (!user) {
    // return res.json({
    //   success: false,
    //   message: "User Not Found Or Invalid email",
    //   error: error.code,
    // });
    return next(new Error("User Not Found Or Invalid email"));
  }
  return res.json({
    success: true,
    message: "Password Updated Successfully",
  });
};
