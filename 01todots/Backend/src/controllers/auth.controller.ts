import User from "../models/auth.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const signup = async (req: any, res:any) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(401).json({ message: "All fields are required" });
    }

   try {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ user, message: "User signup successfully" });
   } catch (error) {
    console.log("Error in signup");
    return res.status(500).json({ message: "server error"});
   }
}