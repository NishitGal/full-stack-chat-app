import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app,server } from './lib/socket.js';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true, limit: '50mb'}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../front-end/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../front-end","dist","index.html"));
    })
}

server.listen(5001, () => {
    console.log('Server is running on port 5001');
    connectDB().catch(err=>{
        console.error('Error connecting to MongoDB', err.message);
    });
});