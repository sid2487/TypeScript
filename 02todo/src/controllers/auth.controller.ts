import catchErrors from "../utils/catchErrors";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Auth from "../models/auth.model";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../constants/env";

export const register = catchErrors(async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new Error("All fields are required")
    }

    const userSchema = z.object({
        name: z.string().min(3, {message: "first name must be atleast 3 char long"}),
        email: z.string().min(3).max(100).email({ message: "Email format is not correct"}),
        password: z.string().min(3, { message: "password must be atleast 3 char long"}).max(100)
    })

    const validateData = userSchema.safeParse(req.body);
    if(!validateData.success){
        const message = validateData.error.issues.map((err) => err.message).join(", ")
        throw new Error(message)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Auth.findOne({email});
    if(existingUser){
        throw new Error("Email already exist");
    }

    const user = await Auth.create({
        name,
        email,
        password: hashedPassword
    })

    return res.status(201).json({user, message: "user register succesfully" });

})

export const login = catchErrors(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new Error("All fields are required");
    }

    const user = await Auth.findOne({ email: email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id}, JWT_PASSWORD, {
        expiresIn: "7d"
    });

    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax' as const
    }

    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({ user, token, message: "User registerd successfully" });
    
})

export const logout = catchErrors(async (req, res) => {
    console.log("logout endpoint hit");
     res.clearCookie("jwt");
    res.status(201).json({ message: "User logout successfully" });
})
