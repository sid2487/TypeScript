import "dotenv/config";
import express from "express";
import { PORT } from "./constants/env";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";
import cookieParser from "cookie-parser"
import { authenticate } from "./middlewares/authenticate";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
console.log("✅ /api/todo routes mounted");

app.get("/test", (req, res) => {
  res.send("Express is working");
  console.log("testing....")
});



app.use(errorHandler);





app.listen(PORT, async() => {
    console.log(`Server is running on ${PORT}`);
    await connectDB();
})

