import { Todo } from "../models/todo.model.js";

//<----------------------GETTODO------------------------>
export const getTodo = async (req, res) => {
  const { _id } = req.user;
  try {
    const todos = await Todo.find({ user: _id });
    if (todos.length === 0)
      return res.status(400).json({ status: false, message: "No todos found" });
    return res
      .status(201)
      .json({ status: true, message: "todo are found", data: todos });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
//<------------------------ADDTODO-------------------------->
export const addTodo = async (req, res) => {
  const { title } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ status: false, message: "please fill input field" });
  const { _id } = req.user;
  try {
    await Todo.create({
      title,
      user: _id,
    });
    return res
      .status(201)
      .json({ status: true, message: "Todo added successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
    });
  }
};

//<-----------------------DELETETODO-------------------------->

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const existingTodo = await Todo.findOneAndDelete({
      _id: id,
      user: _id,
    });

    if (!existingTodo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found or not authorized to delete",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
    });
  }
};

//<-------------------------UPDATETODO--------------------------->

export const updateTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      status: false,
      message: "Please fill input field",
    });
  }

  const { _id } = req.user;
  const { id } = req.params;

  try {
    const existingTodo = await Todo.findOneAndUpdate(
      { _id: id, user: _id },
      { title },
      { new: true }
    );

    if (!existingTodo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found or not authorized to update",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
    });
  }
};
