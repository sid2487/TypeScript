import "dotenv/config"
import express from "express";
import { PORT } from "./constants/env";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";

const app = express();




app.use(errorHandler);


app.listen(PORT, async() => {
    console.log(`Server is running on PORT ${PORT}`);
    await connectDB();
})