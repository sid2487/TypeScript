import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// event handler
// whenever there is a connection, call this function with socket(give me the socket(connection) of that person)

// wss.on("connection", function(socket){
//     console.log("user connected");
//     // send him a hello message(server is pushing an event)
//     socket.send("hello");
// })

/*

wss.on("connection", (socket) => {
  console.log("Client connected ✅");

  // Server receives message from client
  socket.on("message", (data) => {
    console.log("Received from client:", data);
  });

  // Server sends message to client
  socket.send("Hello from server 👋");
});


wss.on("connection", function(socket){
    console.log("User connected");
    setInterval(() => {
        socket.send("Current price of solana is: " + Math.random());
    }, 500)
})

*/

// ping pong example
wss.on("connection", function(socket){
    console.log("user connected");

    // whenever there is a ping message from the client, send pong from server
    socket.on("message", (e) => {
        if(e.toString() === "ping"){
            socket.send("pong");
        }
    })
})