import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



function MessageForm( {handleSubmit, text, setText , setImg}) {
  return (
   <>
   <form  className='message-form' onSubmit={handleSubmit}>
    <label htmlFor="img">
<CloudUploadIcon/>
    </label>
    <input type="file"  id='img' onChange={(e)=>setImg(e.target.files[0])}
    accept='image/*' style={{display: "none"}}/>
    <div>
       <textarea input type="text" placeholder='enter your message
        'value={text} onChange = {e => setText(e.target.value)}maxLength = '3000px' row = '1d0'/> 
    </div>
    <div className='bt'>
        <button className='bto'  ><p>send</p></button>
        
    </div>
   </form>
   
   </>
  )
}

export default MessageForm