import Todo from "../models/todo.model";
import catchErrors from "../utils/catchErrors";

export const createTodo = catchErrors(async (req, res) => {
    const { text, completed } = req.body;
    if (typeof text !== "string" || typeof completed !== "boolean") {
      throw new Error("All fields are required and must be valid types");
    }

    const todo = await Todo.create({
        text,
        completed,
        user: req.user._id,
    });

    return res.status(201).json({ message: "Todo created successfully!"});
})

export const getTodo = catchErrors(async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    if(todos.length === 0){
        return res.status(200).json({ message: "No todos found", todo: [] })
    }

    return res.status(200).json({ todos });
});

export const updateTodo = catchErrors(async (req, res) => {
    const { id } = req.params;

    const updateTodo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })

    if(!updateTodo){
        throw new Error("Todos not found to update")
    }

    res.status(201).json({ todo: updateTodo, message: "Updated successfully" });

});

export const deleteTodo = catchErrors(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);
    if(!todo){
        throw new Error("No todo exist to delete");
    }

    return res.status(200).json({ message: "Successfully deleted todo" });
})

