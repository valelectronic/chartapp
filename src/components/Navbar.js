import React, { } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Stack } from "@mui/system";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




function Navbar({user}) {

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
    
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            edge="start"
            aria-label="logo"
          >
            <Link to="/" className="stack1">
              <ContactMailIcon />
            </Link>
          </IconButton>
          <Link to="/" ></Link >
          <Typography variant="h6" sx={{ flexGrow: 1 }}  className="stack2">
            HI_ME
          </Typography>

          
            {user?(
              <Stack  direction="row" spacing={2} >
                <Link to="/profile" className="stack3"><h2>profile</h2></Link >
                <Button color="inherit" >
                  <Link to="/logout" onClick={handleSignOut} className="stack4">
                    <h3>logout</h3>
                  </Link>
                </Button>
                </Stack>
            ):(

              <Stack direction="row" spacing={2}>
                <Button color="inherit">
                  <Link to="/Register" className="stack5"><h2>register</h2></Link>
                </Button>
                <Button color="inherit">
                  <Link to="/Logging" className="stack6"> <h3>login</h3></Link>
                </Button>
              </Stack>
            )}
              
          

           
              
            
          
          
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
