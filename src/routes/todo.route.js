import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

export const todoRoute = express.Router();
todoRoute.get("/", getTodo).post("/", addTodo);
todoRoute.route("/:id").delete(deleteTodo).patch(updateTodo);
