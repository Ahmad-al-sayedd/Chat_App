import { CreateMessage,getMessage,EditMessage,deleteOneMessage } from "../controllers/sendMessage.js";
import { authMiddleware } from "../middlewre/authMiddleWare.js";

import express from "express";

const router = express.Router();



router.post('/chat/message',authMiddleware,CreateMessage)
router.get("/chat/:chatId", authMiddleware, getMessage);
router.patch('/chat/message/:messageId',authMiddleware,EditMessage)
router.delete('/chat/message/:messageId',authMiddleware,deleteOneMessage)

export default router