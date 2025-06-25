"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            const { roomId, username } = parsedMessage.payload;
            allSockets.push({ socket, room: roomId, username });
            // broadcast user joined msg in the room
            const time = new Date().toLocaleString([], { hour: "2-digit", minute: "2-digit" });
            allSockets.forEach((user) => {
                if (user.room === roomId) {
                    user.socket.send(JSON.stringify({
                        type: "system",
                        payload: {
                            message: `${username} joined the room`,
                            time
                        }
                    }));
                }
            });
        }
        if (parsedMessage.type === "message") {
            const sender = allSockets.find((x) => x.socket === socket);
            if (!sender)
                return;
            const time = new Date().toLocaleString([], { hour: "2-digit", minute: "2-digit" });
            const dataToSend = {
                type: "message",
                payload: {
                    username: sender.username,
                    message: parsedMessage.payload.message,
                    time
                }
            };
            allSockets.forEach((user) => {
                if (user.room === sender.room) {
                    user.socket.send(JSON.stringify(dataToSend));
                }
            });
            // for(let i=0; i<allSockets.length; i++){
            //     if(allSockets[i].room == currentUserRoom){
            //         allSockets[i].socket.send(parsedMessage.payload.message);
            //     }
            // }
            // allSockets
            //     .filter(x => x.room === currentUserRoom)
            //     .forEach(x => x.socket.send(parsedMessage.payload.message));
        }
    });
    socket.on("close", () => {
        allSockets = allSockets.filter(user => user.socket !== socket);
    });
});
