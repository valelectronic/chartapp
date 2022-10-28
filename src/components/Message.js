import React, {useRef,useEffect} from 'react'
import Moment from 'react-moment'

function Message({msgs,user1}) {
  // controlling scrolling effect to the last conversation
    const scroll = useRef();
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"});
    },[msgs])
    
  return (
   <>
   <div className={`message-wrapper ${msgs.from ===user1 ? 'own': ''}`} 
   ref = {scroll}>
    <span className= {msgs.from=== user1 ? 'me' : 'friend'}>{msgs.media ? <img src={msgs.media} alt = {msgs.text}/>:null}
    {msgs.text}
    <br />
    
    <small>
      {/* showing time of last message */}
       <Moment fromNow>{msgs.createdAt.toDate()}</Moment>
    </small>
    </span>
   </div>
   </>
  )
}

export default Message