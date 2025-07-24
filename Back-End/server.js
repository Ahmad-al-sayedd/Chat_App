import express from "express";
import { createError } from "./utils/error.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import ChatRouter from './routes/chat.js'
import { connectDB } from "./utils/db.js";
import MessageRouter from "./routes/message.js"
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

connectDB();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/user",userRoutes)
app.use('/user',ChatRouter)
app.use('/user',MessageRouter)
/* -------------- handling errors ------------- */
app.use((req, res, next) => {
  next(createError(404, "❌ Route not defined!"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
