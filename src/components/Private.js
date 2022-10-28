import { onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { auth } from "../firebase"
import {Outlet } from "react-router-dom"
import Loading from "./Loading"
import Logging from "./logging"





const Private = ( ) => {
  const [user,setUser] = useState(null)
 useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
setUser(user)
})
 },[])
  
  return typeof user === "undefined"? (
    <Loading/>
  ): user ? (
    <Outlet/>
  ):(<Logging/>)
}

export default Private