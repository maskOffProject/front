import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { TextDecoder } from "text-encoding";
import ImageViewer from "../ImageViewer/ImageViewer";
import base64 from 'base-64';
import WebcamCapture from "../camera/WebcamCapture";
import VideoViewer from "../ImageViewer/videoViewer";

const fileTypes = ["JPG", "PNG", "GIF", "mp4"];
const camera = React.createRef();

let video = false;

function submit() {
      let base64Photo;
      if (video) {
        base64Photo = document.getElementById("video").src;
      }
      else {
        base64Photo = document.getElementById("picture").src;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: base64Photo
    };
      fetch('http://localhost:8080', requestOptions)
      .then(response => response.arrayBuffer())
      .then(data => {
        const int8 = (new Uint8Array(data))
        const str = new TextDecoder('utf8').decode(int8);
        if(video) {
          document.getElementById("video").src = "data:video/mp4;base64," + str;
        }
        else {
          document.getElementById("picture").src = "data:image/png;base64," + str;
        }
      });
}

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
    // Do whatever you want with the file contents
      let binaryStr = reader.result
      if (binaryStr.includes('video/mp4')) {
        video = true;
        document.getElementById("video").src = binaryStr;
        document.getElementById("video").setAttribute("controls", "")
        document.getElementById("picture").src = "";
      }
      else {
        video = false;
        document.getElementById("picture").src = binaryStr;
        document.getElementById("video").src = "";
        document.getElementById("video").removeAttribute("controls")
      }
    }
    reader.readAsDataURL(file)
  };
  return (
    <div>
      <ImageViewer/>
      <VideoViewer/>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <WebcamCapture/>
      <button id="upload" className="button-15" role="button" onClick={function(){submit()}}>Upload!</button>
    </div>
  );
}

export default DragDrop;