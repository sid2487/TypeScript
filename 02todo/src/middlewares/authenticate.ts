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
  console.log("🔐 Checking cookies:", req.cookies);

  const token = req.cookies.jwt;

  if (!token) {
    console.log("❌ No token in cookie");
    throw new Error("Unauthorized, no token");
  }

  const decoded = jwt.verify(token, JWT_PASSWORD) as jwt.JwtPayload;
  console.log("✅ Decoded:", decoded);

  if (!decoded || typeof decoded !== "object" || !decoded.userId) {
    console.log("❌ Invalid token payload");
    throw new Error("Invalid token payload");
  }

  const user = await Auth.findById(decoded.userId);
  if (!user) {
    console.log("❌ User not found");
    throw new Error("User not found");
  }

  req.user = user;
  console.log("✅ User authenticated:", req.user._id);

  next();
});
