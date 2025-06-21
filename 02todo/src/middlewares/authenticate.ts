import jwt from "jsonwebtoken";
import catchErrors from "../utils/catchErrors";
import { JWT_PASSWORD } from "../constants/env";
import Auth from "../models/auth.model";
import { Request } from "express";

// Extend Express Request interface to include 'user'
declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}


export const authenticate = catchErrors(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        throw new Error("Unauthorized, no token");
    }

    const decoded = jwt.verify(token, JWT_PASSWORD) as jwt.JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      throw new Error("Invalid token payload");
    }
    
    const user = await Auth.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

   
    
    next();
})