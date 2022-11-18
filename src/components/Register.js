import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import lg from '../components/lg.jpg'
function Register() {
  const PaperStyle = {
    padding: "30px 20px",
    width: "400px",
    margin: "80px auto",
    height: "60vh",
    
    
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const history = useNavigate();
  const { name, email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ ...data, error: null, loading: true });
    console.log(data);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnLine: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history("/");
    } catch (err) {
      setData({ ...data, loading: false, error: err.message });
    }
  };

  return (
    <div>
      <Grid >
        <Paper  elevation={15}  className="paper" >
          <Grid align="center" >
            <Avatar style={{ background: "green" }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <h1 style={{ margin: 5 }}>create an account</h1>
            <Typography variant="caption">
              <h3>please fill this form to create an account</h3>
            </Typography>
          </Grid>
          <form
            component="form"
            style={{  padding:"10px" }}
            onSubmit={handleSubmit}
          >
            <TextField
              type="text"
              fullWidth
              label="username"
              placeholder="please enter your Username"
              required
              variant="standard"
              value={name}
              name="name"
              onChange={handleChange}
            />

            <TextField
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              fullWidth
              label="Email address"
              placeholder="please enter your email address"
              required
              variant="standard"
              pattern="[A-za-z0-9+_+-]+@[A-za-z0-9 -]+\.[a-z]{2,}"
            />
            <TextField
              value={password}
              onChange={handleChange}
              type="password"
              fullWidth
              label="Passwords"
              placeholder="please enter your passwords"
              required
              variant="standard"
              pattern=".[a-zA-z0-9]{8,}"
              title="must be at least 8 characters"
              name="password"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="save my data ?"
              defaultChecked
              color="success"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <p className="create">"creating..." </p>
              ) : (
                "create account"
              )}
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Register;
