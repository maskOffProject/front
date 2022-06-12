import React, { useState } from 'react';
import Webcam from 'react-webcam';
import Button from '../components/elements/Button';
import ButtonGroup from '../components/elements/ButtonGroup';
import Radio from '../components/elements/Radio';
import Switch from '../components/elements/Switch';
import Viewer from '../components/image/Viewer/Viewer';
import { sendMediaFile } from '../utils/api';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


const Live = () => {

  const [isLive, setIsLive] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [id, setId] = useState('');
  const [originBase64File, setOriginBase64File] = useState('');
  const [resultBase64File, setResultBase64File] = useState('');
  const webcamRef = React.useRef(null);

  const stream = () => {
    if (!isWorking) {
      isWorking = true;
      console.log("smile");
      let photo = capture();
      sendMediaFile(photo)
      isWorking = false;
  }}

  const live = () => {
    if (isLive) {
      id = setInterval(stream, 500);
    }
    else {
      clearInterval(id);
    }
  };

  const capture = React.useCallback(
    () => {
      return (webcamRef.current.getScreenshot());
    },
    [webcamRef]
  );

  const captureAndUpdate = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setOriginBase64File(imageSrc)
    },
    [webcamRef]
  );
  
  const submit = async () => {
    setOriginBase64File(originBase64File)
    const result = await sendMediaFile(originBase64File);
    setResultBase64File(result)
  }
  return (
    
  <div>
      <Radio onClick={() => setIsLive(false)} checked={!isLive}>{"Photo"}</ Radio>
      <Radio  onClick={() => setIsLive(true)} checked={isLive}> {"Video"}</ Radio>
      <Viewer originSrc={originBase64File} newSrc={resultBase64File}/>
     
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        mirrored={true}
        videoConstraints={videoConstraints}
      />
      {!isLive ?
        (<><Button color={"primary"} size={15} role="button" onClick={captureAndUpdate}>Capture photo</Button>
        <Button id="upload" size={15} color={"primary"} role="button" onClick={submit}>Upload!</Button></>):
        (<><Button id="live" size={15} color={"primary"} role="button" onClick={live}>LIVE</Button>
        <Switch onClick={() => setIsWorking((prev)=> !prev)} checked={isWorking} rightLabel={"Start Live"} /></>)
      }
      
      
      
    </div>
    
  );
}

export default Live;