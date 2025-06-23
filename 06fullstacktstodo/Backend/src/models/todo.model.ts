import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;