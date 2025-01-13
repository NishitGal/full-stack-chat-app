import mongoose from "mongoose";

const messageScema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
}, {
    timestamps: true
})

const Message = mongoose.model("Message",messageScema);

export default Message;