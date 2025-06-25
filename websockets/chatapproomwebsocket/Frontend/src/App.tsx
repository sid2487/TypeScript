import { useEffect, useRef, useState } from "react";


function App() {
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const [roomId, setRoomId] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);

  const roomInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    roomInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if(joined){
      messageInputRef.current?.focus();
    }
  }, [joined])



  const handleJoinRoom = () => {
    if(!roomId.trim()){
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
          payload: { roomId }
        })
      );
      setJoined(true);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
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
          message: input
        }
      }));
      setInput("")
    }
  }
 

  return (
    <div className="bg-black h-screen flex items-center justify-center text-white">
      <div className="bg-gray-400 w-fit h-fit rounded-xl">
        {!joined && (
          <div className="flex p-2 m-2 justify-center gap-4 items-center">
            <input
              ref={roomInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinRoom();
              }}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter roomId"
              className="border w-fit rounded-lg outline-none p-2 text-center"
              type="text"
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
            <div className="h-[400px] w-[600px] m-4 p-2 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className="bg-green-800 rounded-lg p-2 w-fit">
                  {msg}
                </div>
              ))}
            </div>

            <div className="flex justify-between gap-2 m-2 p-2">
              <input
                ref={messageInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border w-full rounded-xl outline-none p-2 text-black"
                type="text"
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
