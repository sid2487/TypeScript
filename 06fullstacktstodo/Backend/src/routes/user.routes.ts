import express from "express";
import { login, logout, me, signUp } from "../controllers/user.controller";
import { authenticated } from "../middlewares/protected";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authenticated, me);


export default router;