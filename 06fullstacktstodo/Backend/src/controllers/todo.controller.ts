import Todo from "../models/todo.model";
import catchErrors from "../utils/catchErrors";

export const createTodo = catchErrors(async (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: "Text is required",
    });
  }

  const todo = await Todo.create({
    text,
    isCompleted: false,
    user: req.user._id,
  });

  return res
    .status(201)
    .json({ success: true, message: "Created successfully", todo });
});

export const fetch = catchErrors(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  if (todos.length === 0) {
    return res.status(404).json({ success: false, message: "No todos found" });
  }

  return res.status(201).json({ todos, success: true });
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

export const toggleTodo = catchErrors(async (req, res)=> {
  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id, user: req.user._id });

  if(!todo){
    return res.status(404).json({ success: false, message: "Todo not found" });
  }

  todo.isCompleted = ! todo.isCompleted;
  await todo.save();

  return res.status(200).json({
    success: true,
    message: "Todo toggled successully",
    todo,
  })
})
