import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import HomeView from './views/Home/Home';
import Chat from './views/Chat/Chat';
import HomeUser from './views/HomeUser/HomeUser';
import Login from './views/Login/Login';
import MyProfile from './views/MyProfile/MyProfile';
import Profiles from './views/Profiles/Profiles';
import ScheduleActivities from './views/ScheduleActivities/ScheduleActivities';
import Register from './views/Registration/Registration';
import WhoWeAre from './views/WhoWeAre/WhoWeAre';

function App() {
    return (
    <>
     <Router>
        <Routes>
            <Route path="/" element={<HomeView></HomeView>}/>
            <Route path="/auth/login" element={<Login></Login>}/>
            <Route path="/auth/register" element={<Register></Register>}/>
            <Route path="/homeuser" element={<HomeUser></HomeUser>}/>
            <Route path="/scheduleactivity/:userId" element={<ScheduleActivities></ScheduleActivities>}/>
            <Route path="/chat" element={<Chat></Chat>}/>
            <Route path="/profiles" element={<Profiles></Profiles>}/>
            <Route path="/myprofile" element={<MyProfile></MyProfile>}/>
            <Route path="/whoweare" element={<WhoWeAre></WhoWeAre>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
