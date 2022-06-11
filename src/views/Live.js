import React, { useState } from 'react';
import Modal from '../components/elements/Modal';
import WebcamCapture from '../components/image/camera/WebcamCapture';
import Viewer from '../components/image/Viewer/Viewer';
import { sendMediaFile } from '../utils/api';


const Live = () => {

  const [originBase64File, setOriginBase64File] = useState('');
  const [resultBase64File, setResultBase64File] = useState('');

  
  const submit = async () => {
    setOriginBase64File(originBase64File)
    const result = await sendMediaFile(originBase64File);
    setResultBase64File(result)
  }
  return (
    
  <div>
      <Viewer originSrc={originBase64File} newSrc={resultBase64File}/>
      
      <WebcamCapture />
      <button id="upload" className="button-15" role="button" onClick={submit}>Upload!</button>
    </div>
    
  );
}

export default Live;