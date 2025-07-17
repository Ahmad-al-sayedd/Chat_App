import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
       
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};
