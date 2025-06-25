import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./constants/env";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.use("/api/v1/user", userRoutes );





app.listen(PORT, async() => {
    console.log(`Server is running on ${PORT}`);
    await connectDB();
})

