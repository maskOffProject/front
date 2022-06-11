import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
 
const Viewer =({originSrc, newSrc})=>{

  const [isvideo, setIsVideo] = useState(false);
  useEffect(()=>{
    console.log(originSrc.includes('video/mp4'))
    setIsVideo(originSrc.includes('video/mp4'))
  })
  
  

  return (
    <>{isvideo ?
    (<>
      <video autoPlay loop style={{maxHeight: "600px"}} src={originSrc}></video>
      <video autoPlay loop style={{maxHeight: "600px"}}  src={newSrc}></video>
    </>
    ):
    (<>
      <img style={{maxHeight: "600px"}} src={originSrc}></img>
      <img style={{maxHeight: "600px"}}  src={newSrc}></img>
    </>)
    }
    
    </>
  );
  
}

export default Viewer;