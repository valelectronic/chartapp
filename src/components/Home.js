import React, {useEffect, useState,useRef} from "react";
import { db,auth,storage } from "../firebase";
import { collection,query,where,onSnapshot,
  addDoc,Timestamp,orderBy,setDoc,doc,getDoc,updateDoc} from "firebase/firestore";
  import {getDownloadURL, ref ,uploadBytes} from "firebase/storage"
import Users from "./Users";
import MessageForm from "./MessageForm";
import Message from "./Message";
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';




function Home() {
  const [users, setUsers] = useState([])
  const [chart, setChart] = useState("")
  const [text, setText] = useState("")
const [img, setImg] = useState("")
const [msg, setMsg] = useState([])
 

  const user1 = auth.currentUser.uid
  useEffect(()=>{
    const userRef  = collection(db, "users")
    // create query object
    const q = query(userRef, where("uid", 'not-in',[user1]))
//  execute query
const unsub = onSnapshot(q, querySnapshot =>{
  let users = []
  querySnapshot.forEach((doc) =>{
    users.push(doc.data())
  })
  setUsers(users)
})
return ()=> unsub()

  },[])

// getting conversation between users

  const selectUser = async (user)=>{
   
    
    setChart(user)
    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}`: `${user2 + user1}`;
const msgRef = collection(db, 'messages',id,'chart')
const q = query(msgRef,orderBy('createdAt', 'asc'))
onSnapshot(q,querySnapshot=>{
  let msg = []
  querySnapshot.forEach((doc) =>{
   msg.push(doc.data())
  })
 setMsg(msg)
})

//  get last message b/w logged in user and selected user
 const docsnap =await getDoc(doc(db,'lastMsg',id))
//  if last message exist and message is from selected user 
 if(docsnap.data() && docsnap.data().from !== user1){
  // update last messsage and set unread to false
  await updateDoc(doc(db,'lastMsg',id),{unread:false})
 }
 
  }

// submit button
  const handleSubmit = async e =>{
    e.preventDefault()
    const user2 = chart.uid
    const id = user1 > user2 ? `${user1 + user2}`: `${user2 + user1}`;

// setting up folders in the firestore
    let url;
    if(img){
      const imgRef =ref(storage, `images/${new Date().getTime()}- ${img.name}`)
const snap =await uploadBytes(imgRef,img)
const durl = await getDownloadURL(ref(storage,snap.ref.fullPath));
url = durl

    }

    await addDoc(collection(db, "messages",id, "chart"),{
      text,
      from: user1,
      to:user2,
      createdAt:Timestamp.fromDate(new Date()), 
      media: url || ""
    })
await setDoc(doc(db, 'lastMsg',id),{
  text,
  from: user1,
  to:user2,
  createdAt:Timestamp.fromDate(new Date()), 
  media: url || "",
  unread:true,
})

    setText("")

  }
  
    
    
  return (
    <>
    <div className="home-container">
      <div className="users-container">
      {users.map((user)=> <Users  msg = {msg} chart = {chart} user = {user} user1 = {user1} key={user.uid} selectUser = {selectUser}/>)}
      </div>

{chart ? (
      <div className="chartbox" style={{color: "black"}} >
      <div className="user-message">
        <h3 className="c-name">{chart.name}
         <Button  onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}  style={{color:"red", position: 'fixed',
          padding: '1rem 1.5rem',
          fontSize: '10px',
          bottom: '80px',
          right: '170px',
          backgroundColor: 'black',
          color: '#fff',
          textAlign: 'center',}}><ArrowUpwardIcon style= {{fontSize:"30px"}}/>up </Button> </h3> 
        </div>
        <div className="messages">
          {msg.length ? msg.map((msgs,i)=>
          <Message key = {i}  msgs = {msgs} user1 = {user1}/>):null}
        </div>
        <MessageForm setImg = {setImg} handleSubmit = {handleSubmit} text = {text} setText = {setText}/>
    </div>
):(
  <div className='loader'>
  <h2 style={{color: "red"}}>LET'S COMMUNICATE</h2>
    <div className="spine"></div>
    </div>
)}

    </div>
  </>
  );

}

export default Home;
