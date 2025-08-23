import express from "express";
import {
  handleLogin,
  handleSignUp,
  logoutUser,
} from "../controllers/user.controller.js";
export const userRoute = express.Router();
userRoute.post("/login", handleLogin);
userRoute.post("/signup", handleSignUp);
userRoute.post("/logout", logoutUser);
