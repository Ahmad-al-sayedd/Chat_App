import { CreateMessage,getMessage } from "../controllers/sendMessage.js";
import { authMiddleware } from "../middlewre/authMiddleWare.js";

import express from "express";

const router = express.Router();



router.post('/chat/message',authMiddleware,CreateMessage)
router.get("/chat/:chatId", authMiddleware, getMessage);



export default router