import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error){
        console.log(error);
    }
}