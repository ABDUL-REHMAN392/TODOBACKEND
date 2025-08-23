import { Schema, model } from "mongoose";
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Todo = model("Todo", todoSchema);
