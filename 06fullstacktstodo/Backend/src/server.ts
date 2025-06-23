import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants/env";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";


const app = express();




app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);


app.use(errorHandler);


app.listen(PORT, async() => {
    console.log(`Server is running on ${PORT}`);
    await connectDB();
})

