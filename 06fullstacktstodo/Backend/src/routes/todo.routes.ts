import express from "express";
import { authenticated } from "../middlewares/protected";
import { createTodo, deleteTodo, fetch, toggleTodo, updateTodo } from "../controllers/todo.controller";

const router = express.Router();

router.post("/create", authenticated, createTodo);
router.get("/fetch", authenticated, fetch);
router.post("/updateTodo/:id", authenticated, updateTodo);
router.delete("/delete/:id", authenticated, deleteTodo);
router.patch("/toggle/:id", authenticated, toggleTodo);

export default router;