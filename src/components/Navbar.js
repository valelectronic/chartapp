import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Stack } from "@mui/system";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";





function Navbar({user}) {
  const [stickyClass, setStickyClass] = useState('')

  
  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 80 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };


  const history = useNavigate();
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnLine: false,
    });
    await signOut(auth);
    
    history("/Logging"); 
  };
 
  return (

    <>

    <div className="hero">
      <nav className={`navbar ${stickyClass}`} >
        <h1 className="logo"><IconButton
            size="large"
            color="inherit"
            edge="start"
            aria-label="logo"
          >
            <Link to="/" className="stack1">
              <ContactMailIcon />
            </Link>
          </IconButton>
          <Link to="/" ></Link > Hi <span>ME</span></h1>
        <ul>
      {user ? (
<li>
<Link to="/profile" className="stack3"> <li> <h3 style={{padding:"5px"}}>profile</h3></li></Link >
                <Button color="inherit" >
                  <Link to="/logout" onClick={handleSignOut} className="stack4">
                  <li> <h3>logout</h3></li>
                  </Link>
                  </Button>
                  </li>
      ):(
<>
<Button color="inherit">
                  <Link to="/Register" className="stack5"><li><h3>sign up</h3></li></Link>
                </Button>
                <Button color="inherit">
                  <Link to="/Logging" className="stack6"> <li><h3>login</h3></li></Link>
                </Button>
</>
      ) 
      }
      </ul>
      </nav>
    </div>
     
    </>
  );
}

export default Navbar;
