import { useEffect, useRef, useState } from "react";


function App() {
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket>(null);

  type Message = {
    type: string;
    payload: {
      message: string;
      username?: string;
      time?: string;
    };
  };
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);

  const roomInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])
  

  useEffect(() => {
    roomInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if(joined){
      messageInputRef.current?.focus();
    }
  }, [joined])



  const handleJoinRoom = () => {
    if(!roomId.trim() || !username.trim()){
      alert("Please enter a valid Room Id");
      return;
    }

    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;
    

    // The door to the server is now open — you can now send or receive messages.
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId, username }
        })
      );
      setJoined(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if(data.type === "message" || data.type === "system"){
        setMessages((prev) => [...prev, data]);
      }
    };
    

    // return () => {
    //   ws.close();
    // };

  }


  const handleSend = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(JSON.stringify({
        type: "message",
        payload: {
          message: input,
        }
      }));
      setInput("")
    }
  }
 

  return (
    <div className="bg-black h-screen flex items-center justify-center flex-col gap-4 text-white">
      <h1 className="font-bold text-2xl">Chat Room</h1>
      <div className="bg-gray-400 w-fit h-fit rounded-xl">
        {!joined && (
          <div className="flex flex-col gap-4 p-4 m-4">
            <input
              ref={roomInputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="border rounded-lg p-2 text-black text-center"
              type="text"
            />
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="border rounded-lg p-2 text-black text-center"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinRoom();
              }}
            />
            <button
              onClick={handleJoinRoom}
              className="bg-green-600 hover:bg-green-800 transition-colors duration-100 cursor-pointer p-2 rounded-xl font-bold"
            >
              Join Room
            </button>
          </div>
        )}

        {joined && (
          <>
            <div className="h-[400px] w-[600px] m-4 p-2 overflow-y-auto space-y-2 bg-black rounded-lg">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-2 w-fit ${
                    msg.type === "system"
                      ? "bg-gray-600 italic"
                      : "bg-green-800"
                  }`}
                >
                  {msg.type === "system" ? (
                    <span className="flex items-center gap-2">
                      {msg.payload.message}
                      <span className="text-xs text-gray-300">
                        ({msg.payload.time})
                      </span>
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-2">
                        {msg.payload.username}:
                        <span className="font-bold">{msg.payload.message}</span>
                      </span>
                      {/* <span></span> */}
                      <span className="ml-2 text-xs text-gray-300">
                        ({msg.payload.time})
                      </span>
                    </>
                  )}
                </div>
              ))}
              <div ref={scrollRef} className="h-0"></div>
            </div>

            <div className="flex justify-between gap-2 m-2 p-2">
              <input
                ref={messageInputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border w-full rounded-xl outline-none p-2 text-black"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 hover:bg-purple-800 transition duration-100 cursor-pointer rounded-lg p-2 px-4"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App
