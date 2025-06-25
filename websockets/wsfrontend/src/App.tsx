import { useEffect, useRef, useState } from "react"


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {

    if(!socket){
      return;
    }

    // const message = inputRef.current.value
    const message = inputRef.current ? inputRef.current.value : "";
    
    
    socket.send(message);
  }

  useEffect(() => {
    // this will initiate a websocket connection to the server
    // this gives few event handler like ws.onerror, ws.close, ws.onpen....
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    // whenever there is a message from the server, do what tells below(to receive a message)
    ws.onmessage = (ev) => {
      alert(ev.data);
    };

  }, []) 

  


  return (
   <div className="bg-black min-h-screen text-white flex justify-center items-center gap-4">
    <input ref={inputRef} className="border p-2 text-center" type="text" placeholder='Message....' />
    <button className="bg-green-600 rounded-lg px-6 py-3 cursor-pointer hover:bg-green-800 transition-colors duration-100" onClick={sendMessage}>Send</button>
   </div>
  )
}

export default App
