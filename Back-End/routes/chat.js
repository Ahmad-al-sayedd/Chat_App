import { createChat } from "../controllers/chat.js";
import { authMiddleware } from "../middlewre/authMiddleWare.js";

import express from "express";

const router = express.Router();



router.post('/chat',authMiddleware,createChat)



export default router