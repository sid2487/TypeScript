import { JWT_PASSWORD } from "../constants/env";
import User from "../models/user.model";
import catchErrors from "../utils/catchErrors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = catchErrors(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({ success: false,  message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(401).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })

    return res.status(201).json({ success: true, message: "User signup successfully", user });
});


export const login = catchErrors(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return res.status(400).json({ success: false, message: "Email is not registered yet" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({userId: user._id}, JWT_PASSWORD, {
        expiresIn: "7d"
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax" as const,
    };

    res.cookie("jwt", token, cookieOptions);
    return res.status(201).json({ success: true, message: "login successfully", user, token });
});

export const logout = catchErrors(async (req, res) => {
    res.clearCookie("jwt");
    res.status(201).json({ success: true, message: "Loggedout Successfully" });
;})