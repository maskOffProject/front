import { Component } from "react/cjs/react.production.min";
import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

let isLive = false;
let isWorking = false;
let id;


const WebcamCapture = () => {
    const stream = () => {
      if (isLive && !isWorking) {
        isWorking = true;
        console.log("smile");
        let photo = capture();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: photo
      };
        fetch('http://localhost:8080', requestOptions)
        .then(response => response.arrayBuffer())
        .then(data => {
          const int8 = (new Uint8Array(data))
          const str = new TextDecoder('utf8').decode(int8);
          document.getElementById("picture").src = "data:image/png;base64," + str;
          isWorking = false;
        });
    }
  }
  const live = () => {
    isLive = !isLive;
    if (isLive) {
      id = setInterval(stream, 500);
    }
    else {
      clearInterval(id);
    }
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      return (webcamRef.current.getScreenshot());
    },
    [webcamRef]
  );
  const captureAndUpdate = React.useCallback(
    () => {
      isLive = false;
      const imageSrc = capture();
      document.getElementById("picture").src = imageSrc;
    },
    [webcamRef]
  );
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        mirrored={true}
        videoConstraints={videoConstraints}
      />
      <button className="button-15 fix-margin" role="button" onClick={captureAndUpdate}>Capture photo</button>
      <button id="live" className="button-15" role="button" onClick={function(){live()}}>LIVE</button>
    </>
  );
};

export default WebcamCapture;