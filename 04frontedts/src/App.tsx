import { useEffect, useState } from "react"

function App() {

  // interface Todo {
  //   id: number;
  //   text: string;
  //   completed: boolean
  // }

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storeTodos = localStorage.getItem("todoItems");
    return storeTodos ? JSON.parse(storeTodos) : []
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todos));
  }, [todos])

  interface Todo {
    id: number;
    text: string;
    completed: boolean
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if(!input.trim()) return;

    const newTodo: Todo = {
      id: Math.floor(Math.random() * 100) + 1,
      text: input,
      completed: false
    }

    setTodos([...todos, newTodo]);
    console.log(newTodo);
    setInput("");

  }

  // interface ToggleTodo {
  //   (id: number): void;
  // }

  const toggleTodo = (id: number): void => {
    const updatedTodo = todos.map(
      todo => todo.id === id ? {...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodo)
  }

  const deletTodo = (id: number): void => {
    const updatedTodo = todos.filter(
      todo => todo.id !== id
    )
    setTodos(updatedTodo);
  }



  return (
    <div className="bg-black min-h-screen text-black flex items-center justify-center flex-col gap-4">
      <h1>TODO TS</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-4 border max-w-sm rounded-2xl p-6 m-4 bg-slate-600 ">
          <div>
            <input
              placeholder="Add todos...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-white border border-amber-400 outline-none rounded-2xl m-2 p-2"
              type="text"
            />
            <button className="bg-blue-600 p-2 mx-2 rounded-sm px-4 tex">
              Add
            </button>
          </div>

          {todos.map((todo) => (
            <ul className="flex flex-col gap-4 " key={todo.id}>
              <li className="flex items-center justify-between m-2">
                <span className={`${todo.completed ? "line-through" : "none"}`}>
                  {todo.text}
                </span>
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <button
                  onClick={() => deletTodo(todo.id)}
                  className="bg-red-600 p-2 rounded-sm"
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App
