import React, {useEffect,useState} from 'react'
import victor from "../components/victor.jpg"
  import { onSnapshot,doc } from 'firebase/firestore';
  import { db } from '../firebase';
function Users({user,selectUser,user1,chart}) {
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
<div className={`user-wrapper ${chart.name === user.name && 'selected-user'}`} onClick={()=> selectUser(user)}>
  <div className="user-infor">
    <div className="user-detail">
      <img src={user.Avatar || victor } alt = " img" className='avatar'/>
      <h3>{user.name}</h3>
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
<div onClick={()=> selectUser(user)}className={`sm-container ${chart.name === user.name && 'selected-user'}`}>
<img src={user.Avatar || victor } alt = " img" className='avatar sm'/>

{data?. from !== user1 && data?.unread && (
        <small className={`news`}>1</small>

      )}
     
       <h3 className='names'>{user.name}  </h3>
      
      
       
      
</div>

<div className={`status ${user.isOnLine ? "online" : "offline"}` }></div>

</>
   
  )
}

export default Users