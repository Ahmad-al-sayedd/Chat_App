import { validateUser} from "../middlewre/validateUser.js";
import { register,login,gettingUsers } from "../controllers/user.js";
import { authMiddleware } from "../middlewre/authMiddleWare.js";
import express from "express";
const router = express.Router();
// User registration route



router.post("/register" ,validateUser ,register);
router.post("/login",login);
router.get("/users",authMiddleware, gettingUsers);
// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);






export default router;