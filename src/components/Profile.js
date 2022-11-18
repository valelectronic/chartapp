import React, { useState,useEffect } from 'react'
import lg from "../components/lg.jpg"

import { storage ,db,auth} from '../firebase';
import {getDownloadURL, ref ,uploadBytes,deleteObject} from "firebase/storage"
import {
Input
} from "@mui/material";
import { getDoc,doc ,updateDoc} from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
function Profile() {
 

  const history = useNavigate()
 
  const [img, setImg] = useState()
  const [user,setUser] = useState()
  
  useEffect(()=>{
    getDoc(doc(db, 'users',auth.currentUser.uid)).then(docSnap=>{
      if(docSnap.exists){
        setUser(docSnap.data())

      }
    })
    if(img){
      const uploadImg = async ()=>{
        const imgRef = ref(storage,`avatar/${new Date().getTime()}-${img.name}` )
        try{
          if(user.avatarpart){
            await deleteObject(ref(storage,user.avatarpart))
          }
          const snap = await uploadBytes(imgRef,img)
          const Url = await getDownloadURL(ref(storage,snap.ref.fullPath))
          await updateDoc(doc(db, 'users', auth.currentUser.uid),{
            Avatar: Url,
            avatarpart: snap.ref.fullPath
          })
          setImg("")
          alert("upload successful")
          
        }catch(err){
          console.log(err.message)
        }
        
      }
  uploadImg()
    }
    
  },[img])
  // deleting image from database

  const delete_image = async ()=>{
    try{
      const confirm = window.confirm("delete avatar ?");
      if(confirm){
        await deleteObject(ref(storage,user.avatarpart))
        await updateDoc(doc(db, "users",auth.currentUser.uid),{
          Avatar: "",
          avatarpart: ""
        })
        history("/")

      }


    }catch(err){
      alert(err.message)

    }
  }
  
  return user ?(
    <section className="container" > 
    
      <div className="card" >
        <div className="image">
        <img src= {user.Avatar||img} alt= 'avatar' className='img2' />
      
        <label htmlFor="photo"> 
        <CloudUploadIcon className='camera'/> 
        <button onClick={delete_image}>
          {user.Avatar ?<DeleteIcon delete_image = {delete_image}
         style={{color:"black",margin:"30px"}} className='camera'/>: null }</button>
        
        </label>
  
        
        

  
   
       <Input type="file"
       onChange={(e)=> setImg(e.target.files[0])}
       accept='image/*' id='photo'  style= {{display:"none"}} ></Input>
       
        </div>
        
        <h2 style={{padding:"10px", textTransform:"uppercase"}} >  {user.name} </h2>
        <p>{user.email}</p>
        <hr style={{background: "black"}} />
        <small> joined on: {user.createdAt.toDate().toDateString()}</small>
       
      </div>
      


    </section>
  ): null
}

export default Profile