import jwt from "jsonwebtoken";
import User from "../modals/user.modal.js";

/* Middleware to protect routes */
export const protectRoute = async (req,res ,next) => {
    try{
        const token = req.cookies.token;
        
        if(!token){
            return res.status(401).json({message:"Unauthorised access, no token provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET); /* JWT_SECRET is the secret key used to sign the token */
        
        const user = await User.findById(decoded.userId).select("-password"); /* Select all fields except password */

        if(!user){
            return res.status(404).json({message:"User not found"});
        };

        req.user = user;

        next();

    } catch(error){
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};