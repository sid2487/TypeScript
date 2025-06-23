import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import baseURL from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



type Todo = {
  _id: string;
  text: string;
  isCompleted: boolean;
};

const Home = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // const [todos, setTodos] = useState<Todo[]>(() => {
  //   const storeTodos = localStorage.getItem("todoItems");
  //   return storeTodos ? JSON.parse(storeTodos) : [];
  // });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("todoItems", JSON.stringify(todos));
  // }, [todos])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${baseURL}/todo/fetch`, {
          withCredentials: true,
        });

        const allTodos = res.data.todos; 
        console.log(allTodos)
        setTodos(allTodos);
      } catch (error) {
        toast.error("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, []);
  

  const addTodo = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const trimmedInput = text.trim();
    if(!trimmedInput){
      toast.error("All fields are required");
      return;
    }


    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/todo/create`, {
        text,
      },{
        withCredentials: true
      });

      const newTodo = response.data.todo;
      setTodos((prev) => [...prev, newTodo]);
      console.log(newTodo);
      setText("");
      inputRef.current?.focus();
      toast.success("Todo added successfully");
    } catch (error: any) {
      console.error("Failed to add Todo", error);
      const errorMessage = error.response?.data?.message || "Failed to add todo";
      toast.error(errorMessage);
    } finally{
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const res = await axios.patch(`${baseURL}/todo/toggle/${id}`, {}, {
        withCredentials: true,
      });

      const updated = res.data.todo;

      const updatedTodos = todos.map(todo =>
        todo._id === id ? updated : todo
      )
      setTodos(updatedTodos);
    } catch (error) {
      toast.error("Failed to toggle");
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/todo/delete/${id}`, {
        withCredentials: true,
      });

      const updatedTodos = todos.filter(todo =>
        todo._id !== id
      )
      setTodos(updatedTodos);
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${baseURL}/user/logout`, {}, {
        withCredentials: true,
      });
      navigate("/login");

    } catch (error) {
      toast.error("Failed to logout");
    }
  }


  return (
    <>
      <div className="w-full bg-black flex gap-4 items-center justify-center p-4">
        <h1 className="text-white">
          Welcome {user?.firstName} {user?.lastName}
        </h1>
        <button
          className='bg-green-500 px-3 py-1 rounded hover:bg-green-700 hover:text-white transition-colors duration-100 cursor-pointer'
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <form onSubmit={(e) => addTodo(e)}>
        <div className="bg-black min-h-screen text-white flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold">TODO's</h1>
          <div className="bg-gray-600 flex flex-col gap-2 w-fit m-4 p-4 rounded-lg">
            <div className="flex gap-4 p-4 mx-4">
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-white border border-amber-400 outline-none rounded-2xl p-2"
                type="text"
              />
              <button className="bg-blue-600 p-2 rounded px-6 mx-2 hover:bg-blue-800 transition-colors duration-100 cursor-pointer">
                {loading ? "adding..." : "add"}
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between gap-4 bg-gray-800 px-4 py-2 rounded"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`${
                        todo.isCompleted ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodo(todo._id)}
                    />
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            {/* <ul className="flex flex-col gap-4">
            <li className="flex items-center justify-around gap-4">
              <div className="flex gap-4">
                <span>Complete DSA</span>
                <input type="checkbox" />
              </div>
              <button className="bg-red-500 p-1 rounded-sm hover:bg-red-800 cursor-pointer transition-colors duration-100 ">
                Delete
              </button>
            </li>

            <li className="flex items-center justify-around gap-4">
              <div className="flex gap-4">
                <span>Complete DSA</span>
                <input type="checkbox" />
              </div>
              <button className="bg-red-500 p-1 rounded-sm hover:bg-red-800 cursor-pointer transition-colors duration-100 ">
                Delete
              </button>
            </li>
          </ul> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default Home