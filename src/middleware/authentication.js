import jwt from "jsonwebtoken";
import User from "../../Db/models/user_model.js";

export const isAuthentication = async (req, res, next) => {
  let { token } = req.headers;

  //token Required
  if (!token) return res.json({ success: false, message: "Token Is Required" });

  if (!token.startsWith(process.env.BEARERTOKEN))
    return res.json({ success: false, message: "error in Bearer Token" });

  token = token.split(process.env.BEARERTOKEN)[1];

  const payload = jwt.verify(token, process.env.TOKENKEY);

  const { id } = payload;
  //check if user exists
  const user = await User.findById(id);

  if (!user) return res.json({ success: false, message: "Invalid User" });

  req.user = user;
  return next();
};
