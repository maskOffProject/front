import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
 
const Viewer =({isLiveVideo,originSrc, newSrc})=>{

  const [isvideo, setIsVideo] = useState(false);
  useEffect(()=>{
    setIsVideo(originSrc.includes('video'))
  },[originSrc,newSrc])
  
  

  return (
    <div className='viewer'>{isvideo ?
    (<>
      <video autoPlay loop className='viewer-item' style={isLiveVideo ?{transform: "scaleX(-1)" }:{}} src={originSrc}></video>
      <video autoPlay loop className='viewer-item' style={isLiveVideo?{transform: "scaleX(-1)" }:{}} src={newSrc && `data:video/mp4;base64,${newSrc}`}></video>
    </>
    ):
    (<>
      <img className='viewer-item' src={originSrc}></img>
      <img className='viewer-item' src={newSrc &&`data:image/png;base64,${newSrc}`}></img>
    </>)
    }
    
    </div>
  );
  
}

export default Viewer;