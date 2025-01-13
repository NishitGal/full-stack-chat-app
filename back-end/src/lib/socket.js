import {Server} from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//used to store online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection",(socket) => {
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]; //remove user from online users
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        console.log("A user disconnected");
    })
})

export {io,app,server};