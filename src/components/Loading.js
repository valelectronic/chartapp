import React from 'react'

function Loading() {
  return (
    <div style={{position: "absolute"}}>
    <h1 style={{
        positon:"absolute",
        top:"50%",
        left:"50%",
        color:"red",
        transform:"translate(-50% -50%)"
    }}>loading....., please wait</h1>
    
    </div>
  )
}

export default Loading