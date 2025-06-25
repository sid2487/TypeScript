import { useEffect, useRef, useState } from "react";


function App() {
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);


  


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };

    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }

    inputRef.current?.focus();

    ws.onopen = () => {
      console.log("Connected to websocket server");
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleClick = () => {
    if(socketRef.current && input.trim() !== ""){
      socketRef.current.send(input);
      setInput("");
    }
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center text-white">
      <div className="bg-gray-400 w-fit h-fit rounded-xl">
        <div className="h-[400px] w-[600px] m-4 p-2 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="text-black bg-amber-300 p-2 rounded-xl w-fit max-w-[80%]"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-2 m-2 p-2">
          <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
            className="border w-full rounded-xl outline-none p-2 text-black"
            type="text"
            onKeyDown={(e) => {
              if(e.key === "Enter") handleClick();
            }}
          />
          <button onClick={handleClick} className="bg-purple-600 hover:bg-purple-800 transition duration-100 cursor-pointer rounded-lg p-2 px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
