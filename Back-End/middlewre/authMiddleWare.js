import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
       console.log("Token from cookies or headers:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log("Decoded token:", decoded);
   
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }
    req.user = user; // Attach user to request object
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};
