import User from "../modals/user.modal.js";
import Message from "../modals/message.modal.js";
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUser=req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");

        return res.status(200).json(filteredUsers);
    } catch(error){
        console.log("error in getUsersForSidebar",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId} 
            ]
        });

        return res.status(200).json(messages);
    } catch(error){
        console.log("error in getMessages",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const sendMessage = async(req,res) => {
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }

        const message = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await message.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",message);
        }

        return res.status(200).json(message);
        //todo : real time functionalityyy

        
    } catch(error){
        console.log("error in sendMessage",error.message);
        return res.status(500).json({message:"Internal server error"}); 
    }
}