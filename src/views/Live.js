import React, { useState } from 'react';
import Webcam from 'react-webcam';
import Button from '../components/elements/Button';
import Radio from '../components/elements/Radio';
import Switch from '../components/elements/Switch';
import Viewer from '../components/image/Viewer/Viewer';
import { sendMediaFile } from '../utils/api';

let uploaded = false;
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
      uploaded = true;
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
      uploaded = true;
    },
    [webcamRef]
  );
  
  const submit = async () => {
    setOriginBase64File(originBase64File)
    const result = await sendMediaFile(originBase64File);
    setResultBase64File(result);
    uploaded = true;

  }
  return (
    
  <div className={"page-content"}>
      
      <Radio onClick={() => setIsLive(false)} checked={!isLive}>{"Photo"}</ Radio>
      <Radio  onClick={() => setIsLive(true)} checked={isLive}> {"Video"}</ Radio>

      {uploaded? (<Viewer originSrc={originBase64File} newSrc={resultBase64File}/>)
      :
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        mirrored={true}
        videoConstraints={videoConstraints}
        style={{ maxWidth: "80%", margin: "auto"}}
      />
      }

      {!isLive ?
        (<><Button color={"primary"} role="button" onClick={captureAndUpdate}>Capture photo</Button>
        <Button id="upload" color={"primary"} role="button" onClick={submit}>Upload!</Button></>):
        (<><Button id="live"  color={"primary"} role="button" onClick={live}>LIVE</Button>
        <Switch onClick={() => setIsWorking((prev)=> !prev)} checked={isWorking} rightLabel={"Start Live"} /></>)
      }
    </div>
    
  );
}

export default Live;