import React, { useState } from "react";
import axios from "axios";
import baseURL from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const Signup = () => {
  // const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedlastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if(!trimmedFirstName || !trimmedlastName || !trimmedEmail || !trimmedPassword){
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/user/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      const data = response.data;
      // setData(data);
      console.log(data);
      toast.success("Successfully signup!!");
      setFirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error: any) {
      console.error("Signup Failed: ", error);
      const errorMessage = error.response?.data?.message || "Signup failed, try again!"
      toast.error(errorMessage);
    } finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-center">Signup</h1>

        <div className="bg-gray-600 w-fit flex m-8 p-8 rounded-2xl">
          <div className="flex flex-col gap-4  ">
            <input
              className="text-white border border-amber-400 outline-none rounded-2xl m-2 p-2"
              placeholder="siddharth....."
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="text-white border border-amber-400 outline-none rounded-2xl m-2 p-2"
              placeholder="mishra....."
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />

            <input
              className="text-white border border-amber-400 outline-none rounded-2xl m-2 p-2"
              placeholder="abc@something.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="text-white border border-amber-400 outline-none rounded-2xl m-2 p-2"
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className=" m-2 p-2 cursor-pointer rounded-lg bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 transition ">
              {loading ? "Loading...." : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
