import User from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) => {
    const {email,fullname,password} = req.body;
    try{

        if(!email || !fullname || !password){
            return res.status(400).send({message:"Please fill all fields"});
        }

        if(password.length < 6){
            return res.status(400).send({message:"Password must be at least 6 characters"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).send({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            fullname,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            newUser.save();

            res.status(200).json({
                _id:newUser.id,
                email:newUser.email,
                fullname:newUser.fullname,
                profilepic:newUser.profilePic,
            }) 
        } else{
            res.status(400).json({message:"Invalid user data"})
        } 

    } catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
}}

export const login = async (req,res) => {
   try{
         const {email,password} = req.body;
    
         if(!email || !password){
              return res.status(400).send({message:"Please fill all fields"});
         }
    
         const user = await User.findOne({email});

         if(!user){
             return res.status(400).send({message:"Invalid credentials"});
         }

         const isMatch = await bcrypt.compare(password,user.password);

         if(!isMatch){
             return res.status(400).send({message:"Invalid credentials"});
         }

         generateToken(user._id,res);

         res.status(200).json({
             _id:user.id,
             email:user.email,
             fullname:user.fullname,
             profilepic:user.profilePic
         })

         

   } catch(error){
       console.log("Error in login controller",error.message);
       res.status(500).json({message:"Internal server error"});
   }
}

export const logout = async (req,res) => {
    try{
        res.cookie("token","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch(error){
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async (req,res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Please provide a profile picture"});
        }

        const upload = await cloudinary.uploader.upload(profilePic, {
            folder: "profile_pics",
        }).catch(err => {
            console.error("Cloudinary upload error:", err);
            return res.status(500).json({ message: "Image upload failed" });
        });
        

        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url},{new:true});

        res.status(200).json({message:"Profile updated successfully",updatedUser});

    } catch(error){
        console.log("error in update profile",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = async (req,res) => {
    try{
        res.status(200).json(req.user);
    } catch(error){
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});
    } 
}