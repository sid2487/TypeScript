import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
// import catchErrors from "../utils/catchError";


 export const signupUser = async (req: Request, res: Response, next:NextFunction): Promise<Response | void > => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if(existingUser){
            return res.status(400).json({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "Signup successfully", user});
    } catch (error) {
        next(error);
        // console.log("Server Error", error);
        // return res.status(500).json({ message: "Server Error"});
    }

}

// export const signupController = catchErrors(signupUser);