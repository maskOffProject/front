import React, { useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import Webcam from 'react-webcam';
import Button from '../components/elements/Button';
import Radio from '../components/elements/Radio';
import Viewer from '../components/image/Viewer/Viewer';
import { sendMediaFile } from '../utils/api';

let showResults = false;
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
      setOriginBase64File(imageSrc);
      setResultBase64File('');
      showResults = true;
    },
    [webcamRef]
  );
  
  const submit = async () => {
    setOriginBase64File(originBase64File)
    const result = await sendMediaFile(originBase64File);
    setResultBase64File(result);

  }

  return (
    
  <div className={"page-content"}>
    <div className="radio-content">
      <Radio  className="radio" onClick={() => {setIsLive(false); setOriginBase64File(''); setResultBase64File('');showResults = false;}} checked={!isLive}>{"Photo"}</ Radio>
      <Radio className="radio" onClick={() => {setIsLive(true); setOriginBase64File(''); setResultBase64File(''); recordWebcam.open(); showResults = false;}} checked={isLive}> {"Video"}</ Radio>
    </div>
    {showResults || recordWebcam.status == "PREVIEW"?
    <Viewer isLiveVideo={isLive} originSrc={originBase64File} newSrc={resultBase64File}/>
    :
      !isLive ? <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        mirrored={true}
        videoConstraints={videoConstraints}
        style={{maxWidth:"80%", margin:"auto"}}
      /> :
      (<div style={{maxWidth:"80%", margin:"auto"}}>
      <p>Camera status: {recordWebcam.status}</p>

        {recordWebcam.status != "PREVIEW" ? <video style={{transform: 'scaleX(-1)'}} ref={recordWebcam.webcamRef} autoPlay muted /> : null}
        <video style={{transform: 'scaleX(-1)'}}  ref={recordWebcam.previewRef} autoPlay muted loop />
      </div>)}
      
      {!isLive ?
        (<>
          <div style={{ margin: "auto"}}> 
            <Button color={"primary"} role="button" onClick={captureAndUpdate}>Capture photo</Button>
          </div>
          <div style={{ margin: "auto"}}> 
            <Button id="upload" color={"primary"} role="button" onClick={submit}>Upload!</Button>
          </div>
        </>):
        (<div>{recordWebcam.status == "OPEN" ? <Button color={"primary"} onClick={recordWebcam.start}>Start recording</Button> : null}
        {recordWebcam.status == "RECORDING" ? <Button color={"primary"} onClick={recordWebcam.stop}>Stop recording</Button> : null}
        {recordWebcam.status == "PREVIEW" ? <Button color={"primary"} onClick={recordWebcam.retake}>Retake recording</Button> : null}
        {recordWebcam.status == "PREVIEW" ? <Button color={"primary"} onClick={saveFile}>Upload!</Button> : null}</div>
        )
      }
    </div>
    
  );
}

export default Live;