import { Component } from "react/cjs/react.production.min";
import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      document.getElementById("test").src = imageSrc;
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
      <button className="button-15 fix-margin" role="button" onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebcamCapture;