import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = []

wss.on("connection", (socket) => {
    allSockets.push(socket);

    userCount++;
    console.log(`User connected # ${userCount}`);

    // socket.on("message", (message) => {
    //     console.log("message received" + message.toString());
    //     for(let i=0; i < allSockets.length; i++){
    //         const s = allSockets[i];
    //         s.send(message.toString() + ": sent from the server");
    //     }
    // })

    socket.on("message", (message) => {
        const msg = message.toString();
        console.log("message recieved: " + msg);

        allSockets.forEach((s) => 
            s.send(`${msg}: sent from the user:${userCount}`)
        )
    })

    socket.on("close", () => {
        allSockets = allSockets.filter(x => x != socket);
    })
})