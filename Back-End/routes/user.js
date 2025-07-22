import { validateUser} from "../middlewre/validateUser.js";
import { register,login,getProfile,getAllUsers } from "../controllers/user.js";
import { authMiddleware } from "../middlewre/authMiddleWare.js";
import express from "express";
const router = express.Router();
// User registration route



router.post("/register" ,validateUser ,register);
router.post("/login",login);

router.get("/profile", authMiddleware, getProfile);
router.get("/all-users",authMiddleware, getAllUsers);
// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);






export default router;