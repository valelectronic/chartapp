import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import lg from '../components/lg.jpg'

function Logging() {
  // requirements for logging in
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  // navigate using usenavigate
  const history = useNavigate();
  const { email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // control whhat to be stored in the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ ...data, error: null, loading: true });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnLine: true,
      });
      // setting all input filed empty if submitted successfully
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      // navigate to home page if data found in the data base
      history("/");
    } catch (err) {
      setData({ ...data, loading: false, error: err.message });
      alert(err.message)
    }
  };
  return (
    <>
      <Grid  >
        <Paper
          elevation={15}
          className="paper"
          style={{padding: "20px", paddingTop: "50px"}}
        >
          <Grid align="center">
            <Avatar style={{ backgroundColor: "green" }}>
              <LockIcon />
            </Avatar>
            <h2 style={{ margin: "2px" }}> sign in</h2>
            <Typography> <h3>fill the form to sign in</h3></Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              value={email}
              type="email"
              fullWidth
              placeholder="enter your email address"
              variant="standard"
              required
              label="Email Address"
              onChange={handleChange}
              name="email"
            />
            <TextField
              name="password"
              value={password}
              type="password"
              fullWidth
              placeholder="enter your password"
              variant="standard"
              required
              pattern=".{8,}"
              title="8 characters minimum"
              label="Password"
              onChange={handleChange}
            />

            <Button
              style={{ margin: "15px 0" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <p > sign...</p> : "sign in"}
            </Button>
            <Typography>
              <Link href="#" underline="always">
                forgot password ?
              </Link>
            </Typography>
            <Typography>
              you don,t have an account ?
              <Link href="/Register" underline="always">
                sign up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Logging;
