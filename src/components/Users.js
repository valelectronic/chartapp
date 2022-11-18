import React, {useEffect,useState,useRef} from 'react'
import victor from "../components/victor.jpg"
  import { onSnapshot,doc } from 'firebase/firestore';
  import { db } from '../firebase';




function Users({user,selectUser,user1,chart}) {

  
  const scrol = useRef()

  const user2 = user?.uid
  const [data,setData] = useState("")
  useEffect(()=>{
    const id = user1 > user2 ? `${user1 + user2}`: `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg',id), (doc) =>{
      setData(doc.data())
      
    })
return () => unsub()
  },[])
  
  return (
<> 

<div className={`user-wrapper ${chart.name === user.name && 'selected-user'}`} onClick={()=> selectUser(user, scrol.current.scrollIntoView({behavior: "smooth"}))} >
  <div className="user-infor" >
    
    <div className="user-detail" ref={scrol}>
      <img src={user.Avatar || victor } alt = " img" className='avatar'/>
      <h3>{user.name}</h3> <br />
      
      <h5 style={{background:"red"}}>{user.isOnLine}</h5>
      {data?. from !== user1 && data?.unread && (
        <small className='new'>new</small>
      )}

    </div>
    
    <div className={`status ${user.isOnLine ? "online" : "offline"}` }>
    </div>
  </div>
  {data && (
      <p className='truncate'>
         <strong>{data.from === user1 ? 'me:':null} </strong>
        {data.text}</p>
    )}
</div>





</>
   
  )
}

export default Users