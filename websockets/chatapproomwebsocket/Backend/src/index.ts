import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type === "message"){
            const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;

            allSockets.forEach((user) => {
                if(user.room === currentUserRoom){
                    user.socket.send(parsedMessage.payload.message)
                }
            })

            // for(let i=0; i<allSockets.length; i++){
            //     if(allSockets[i].room == currentUserRoom){
            //         allSockets[i].socket.send(parsedMessage.payload.message);
            //     }
            // }

            // allSockets
            //     .filter(x => x.room === currentUserRoom)
            //     .forEach(x => x.socket.send(parsedMessage.payload.message));
        }
    })
})