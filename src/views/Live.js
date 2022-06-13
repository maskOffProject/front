import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useRecordWebcam  } from 'react-record-webcam'
import Button from '../components/elements/Button';
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
  const recordWebcam = useRecordWebcam({  width: 1280, height: 720, fileType: 'webm', recordingLength: 5});
  const [isLive, setIsLive] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [id, setId] = useState('');
  const [originBase64File, setOriginBase64File] = useState('');
  const [resultBase64File, setResultBase64File] = useState('');
  const webcamRef = React.useRef(null);

  const saveFile = async () => {
    const blob = (await recordWebcam.getRecording());
    let reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = async function() {
      let base64data = reader.result;
      base64data = "data:video/webm;base64," + base64data.split(',')[2];
      setOriginBase64File(base64data)
      const result = await sendMediaFile(base64data);
      setResultBase64File(result)
    }
    // setOriginBase64File(originBase64File)
    // const result = await sendMediaFile(originBase64File);
    // setResultBase64File(result)
  }

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
    
  <div className={"page-content"}>
      <Radio onClick={() => setIsLive(false)} checked={!isLive}>{"Photo"}</ Radio>
      <Radio  onClick={() => {setIsLive(true); recordWebcam.open()}} checked={isLive}> {"Video"}</ Radio>
      <Viewer originSrc={originBase64File} newSrc={resultBase64File}/>
     
      {!isLive ? <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        mirrored={true}
        videoConstraints={videoConstraints}
      /> :
      (<div>
      <p>Camera status: {recordWebcam.status}</p>
        {/* <button onClick={recordWebcam.retake}>Retake recording</button>} */}
        {/* <button onClick={recordWebcam.stop}>Stop recording</button> */}
        {/* <button onClick={saveFile}>Save file to server</button> */}
        {recordWebcam.status != "PREVIEW" ? <video style={{transform: 'scaleX(-1)'}} ref={recordWebcam.webcamRef} autoPlay muted /> : null}
        <video style={{transform: 'scaleX(-1)'}}  ref={recordWebcam.previewRef} autoPlay muted loop />
      </div>)}
      
      {!isLive ?
        (<><Button color={"primary"} role="button" onClick={captureAndUpdate}>Capture photo</Button>
        <Button id="upload" color={"primary"} role="button" onClick={submit}>Upload!</Button></>):
        (<div>{recordWebcam.status == "OPEN" ? <Button color={"primary"} onClick={recordWebcam.start}>Start recording</Button> : null}
        {recordWebcam.status == "RECORDING" ? <Button color={"primary"} onClick={recordWebcam.stop}>Stop recording</Button> : null}
        {recordWebcam.status == "PREVIEW" ? <Button color={"primary"} onClick={recordWebcam.retake}>Retake recording</Button> : null}
        {recordWebcam.status == "PREVIEW" ? <Button color={"primary"} onClick={saveFile}>Upload!</Button> : null}</div>
        )
        // (<><Button id="live"  color={"primary"} role="button" onClick={live}>LIVE</Button>
        // <Switch onClick={() => setIsWorking((prev)=> !prev)} checked={isWorking} rightLabel={"Start Live"} /></>)
      }
      
      
      
    </div>
    
  );
}

export default Live;