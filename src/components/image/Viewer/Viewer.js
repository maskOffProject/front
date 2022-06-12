import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
 
const Viewer =({originSrc, newSrc})=>{

  const [isvideo, setIsVideo] = useState(false);
  useEffect(()=>{
    setIsVideo(originSrc.includes('video/mp4'))
  },[originSrc,newSrc])
  
  

  return (
    <>{isvideo ?
    (<>
      <video autoPlay loop style={{maxHeight: "600px"}} src={originSrc}></video>
      <video autoPlay loop style={{maxHeight: "600px"}}  src={`data:video/mp4;base64,${newSrc}`}></video>
    </>
    ):
    (<>
      <img style={{maxHeight: "600px"}} src={originSrc}></img>
      <img style={{maxHeight: "600px"}}  src={`data:image/png;base64,${newSrc}`}></img>
    </>)
    }
    
    </>
  );
  
}

export default Viewer;