import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./src/connections/db.js";
import cookieParser from "cookie-parser";
import { userRoute } from "./src/routes/user.route.js";
import { todoRoute } from "./src/routes/todo.route.js";
import { validation } from "./src/middlewares/validation.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/user", userRoute);
app.use("/api/todo/", validation, todoRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at port ${PORT}`);
});
