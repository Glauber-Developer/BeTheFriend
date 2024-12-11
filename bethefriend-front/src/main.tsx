import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeView from './views/Home/Home.tsx'
import Register from './views/Registration/Registration.tsx'
import HomeUser from './views/HomeUser/HomeUser.tsx'
import Login from './views/Login/Login.tsx'
import ScheduleActivities from './views/ScheduleActivities/ScheduleActivities.tsx'
import MyActivities from './views/MyActivities/MyActivities.tsx'
import Chat from './views/Chat/Chat.tsx'
import Profiles from './views/Profiles/Profiles.tsx'
import User from './views/User/User.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<HomeView></HomeView>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/register" element={<Register></Register>}/>
            <Route path="/homeuser" element={<HomeUser></HomeUser>}/>
            <Route path="/scheduleactivity" element={<ScheduleActivities></ScheduleActivities>}/>
            <Route path="/chat" element={<Chat></Chat>}/>
            <Route path="/profiles" element={<Profiles></Profiles>}/>
            <Route path="/user" element={<User></User>}/>
            <Route path="/myactivities" element={<MyActivities></MyActivities>}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
