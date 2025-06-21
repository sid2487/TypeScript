import "dotenv/config"
// import dotenv from "dotenv"
import express from "express";
import connectDB from "./config/db";
import { PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";

// dotenv.config();


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);




app.listen(PORT, async () => {
    console.log(`Server is also running on ${PORT}`);
    await connectDB();
})