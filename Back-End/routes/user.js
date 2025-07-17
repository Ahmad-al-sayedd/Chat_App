import { validateUser} from "../middlewre/validateUser.js";
import { register,login } from "../controllers/user.js";

import express from "express";
const router = express.Router();
// User registration route



router.post("/register" ,validateUser ,register);
router.post("/login",login);
// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);






export default router;