import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`DB connected successfully ${conn.connection.host}`)
    } catch (error) {
        console.log("DB connection failed", error);
        process.exit(1);
    }
}

export default connectDB;