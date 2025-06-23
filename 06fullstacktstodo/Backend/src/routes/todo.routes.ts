import express from "express";
import { authenticated } from "../middlewares/protected";
import { createTodo, deleteTodo, fetch, updateTodo } from "../controllers/todo.controller";

const router = express.Router();

router.post("/create", authenticated, createTodo);
router.get("/fetch", authenticated, fetch);
router.post("/updateTodo/:id", authenticated, updateTodo);
router.post("/delete/:id", authenticated, deleteTodo);

export default router;