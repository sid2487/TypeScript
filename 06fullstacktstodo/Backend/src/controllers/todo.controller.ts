import Todo from "../models/todo.model";
import catchErrors from "../utils/catchErrors";

export const createTodo = catchErrors(async (req, res) => {
  const { text, isCompleted } = req.body;
  if (typeof text !== "string" || typeof isCompleted !== "boolean") {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }

  const todo = await Todo.create({
    text,
    isCompleted,
    user: req.user._id,
  });

  return res
    .status(201)
    .json({ success: false, message: "Created successfully", todo });
});

export const fetch = catchErrors(async (req, res) => {
  const todo = await Todo.find({ user: req.user._id });
  if (todo.length === 0) {
    return res.status(404).json({ success: false, message: "No todos found" });
  }

  return res.status(201).json({ todo, success: true });
});

export const updateTodo = catchErrors(async (req, res) => {
  const { id } = req.params;

  const update = await Todo.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  if(!update){
    return res.status(404).json({ success: false, message: "No todos found to update" });
  }

  return res
    .status(201)
    .json({ success: true, message: "updated successfully", update });
});

export const deleteTodo = catchErrors(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

  if(!todo){
    return res.status(404).json({ success: false, message: "No todos found to delete" });
  }

  return res
    .status(201)
    .json({ success: true, message: "deleted successfully" });
});
