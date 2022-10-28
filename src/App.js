
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Logging from "./components/logging";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import { useState ,useEffect} from "react";
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Private from "./components/Private";
import Home from "./components/Home";
import Message from "./components/Message";


function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
    
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
      setLoading(false)
     
    },[])
  })
  
  if(loading){
    return<Loading></Loading>
  }

  return (
    <>
  
        <Navbar  user = {user} Loading = {loading}/>
        <Routes>
          
          <Route element = {<Private/>}>
            <Route element = {<Home/>} path = "/" exact/>
            <Route path="/Profile" exact element={<Profile />} />
          </Route>
          <Route path="/Register" exact element={<Register />} />
          <Route path="/Logging" exact element={<Logging />} />
        
          <Route path="/Logout" exact element={< Logout/>} />
          <Route path="/Message" exact element= {<Message/>}/>
        </Routes>
        
    </>
  );
}

export default App;
