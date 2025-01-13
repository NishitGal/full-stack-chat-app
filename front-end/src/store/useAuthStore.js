import axios from 'axios';
import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// Create a store for authentication
// This store will have the following states:
// - authUser: the authenticated user
// - isSigningUp: a boolean to indicate if the user is currently signing up
// - isLoggingIn: a boolean to indicate if the user is currently logging in
// - isUpdatingProfile: a boolean to indicate if the user is currently updating their profile
// - isCheckingAuth: a boolean to indicate if the user is currently checking their authentication status

// The store will also have the following actions:
// - CheckAuth: a function to check the user's authentication status
// - SignUp: a function to sign up the user
// - Login: a function to log in the user
// - Logout: a function to log out the user
// - UpdateProfile: a function to update the user's profile
// - DeleteAccount: a function to delete the user's account

export const useAuthStore = create((set,get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket:null,
    
    isCheckingAuth: true,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data,isCheckingAuth: false});
            get().connectSocket();
        } catch(error){
            set({authUser: null,isCheckingAuth: false});
            console.error("error in check auth",error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            toast.success("Signed up successfully!");
            set({authUser: res.data});
            get().connectSocket();
        } catch(error){
            toast.error(error.response.data.message);
            console.error("error in signup",error);
        } finally {
            set({isSigningUp: false});
        }
    },

    logout: async () => {
        try{
            await axiosInstance.get("/auth/logout");
            toast.success("Logged out successfully!");
            set({authUser: null});
            get().disconnectSocket();
        } catch(error){
            console.error("error in logout",error);
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try{
            const res = await axiosInstance.post("/auth/login",data);
            toast.success("Logged in successfully!");
            set({authUser: res.data});
            get().connectSocket()
        } catch(error){
            toast.error("wrong credentials");
            console.error("error in login",error);
        } finally {
            set({isLoggingIn: false});
        }
    },

    updateprofile: async (data) => {
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser: res.data});
            toast.success("Profile updated successfully!");
        } catch(error){
            toast.error(error.response.data.message);
            console.error("error in update profile",error);
        } finally {
            set({isUpdatingProfile: false});
        }
    },
    
    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        });
        socket.connect();
        set({socket:socket});
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        })
    },

    disconnectSocket: () => {
        const {socket} = get();
        if(socket?.connected){
            socket.disconnect();
        }
        set({socket:socket});
    },
}));