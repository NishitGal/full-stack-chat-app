import React, { useEffect, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useAuthStore } from './store/useAuthStore'

import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import HomePage from './pages/HomePage'
import { use } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'

import { useThemeStore } from './store/useThemeStore'

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser)
    return <div className='flex justify-center items-center h-screen'>
        <Loader size='50px' className='animate-spin'/>
    </div>
  

  return (
    <div data-theme={theme}>
        <Navbar/>

        <Routes>
            <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} replace />} />  
            <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>}  replace/>
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} replace/>
            <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to={"/login"} />} replace/>
            <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} replace/>
        </Routes>

        <Toaster  />
    </div>
  )
}

export default App
