import jwt, { decode } from "jsonwebtoken";
import catchErrors from "../utils/catchErrors";
import { JWT_PASSWORD } from "../constants/env";
import User from "../models/user.model";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

export const authenticated = catchErrors(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        throw new Error("Not authorised");
    }

    const decoded = jwt.verify(token, JWT_PASSWORD)

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();

})