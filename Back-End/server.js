import express from "express";
import { createError } from "./utils/error.js";
// import cors from 'cors';
import cookieParser from "cookie-parser";

import { connectDB } from "./utils/db.js";

import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use("/user",userRoutes)
/* -------------- handling errors ------------- */
app.use((req, res, next) => {
  next(createError(404, "❌ Route not defined!"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
