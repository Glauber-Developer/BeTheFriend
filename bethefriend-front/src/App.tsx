import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import HomeView from './views/Home';
import Chat from './views/Chat/Chat';
import HomeUser from './views/HomeUser/HomeUser';
import Login from './views/Login/Login';
// import MyProfile from './views/MyActivities/MyActivities';
import Profiles from './views/Profiles/Profiles';
import ScheduleActivities from './views/ScheduleActivities/ScheduleActivities';
import User from './views/User/User';
import Register from './views/Registration/Registration';

function App() {
    return (
    <>
     <Router>
        <Routes>
            <Route path="/" element={<HomeView></HomeView>}/>
            <Route path="/auth/login" element={<Login></Login>}/>
            <Route path="/auth/register" element={<Register></Register>}/>
            <Route path="/homeuser" element={<HomeUser></HomeUser>}/>
            <Route path="/scheduleactivity" element={<ScheduleActivities></ScheduleActivities>}/>
            <Route path="/chat" element={<Chat></Chat>}/>
            <Route path="/profiles" element={<Profiles></Profiles>}/>
            <Route path="/user" element={<User></User>}/>
            {/* <Route path="/myprofile" element={<MyProfile></MyProfile>}/> */}
        </Routes>
    </Router>
    </>
  )
}

export default App
