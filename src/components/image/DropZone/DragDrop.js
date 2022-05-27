import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { TextDecoder } from "text-encoding";
import ImageViewer from "../ImageViewer/ImageViewer";
import base64 from 'base-64';
const fileTypes = ["JPG", "PNG", "GIF"];

function submit() {
      let binaryStr = document.getElementById("test").src;
      binaryStr = binaryStr.substring(binaryStr.indexOf(',') + 1)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: binaryStr
    };
      fetch('http://localhost:8080', requestOptions)
      .then(response => response.arrayBuffer())
      .then(data => {
        const int8 = (new Uint8Array(data))
        const str = new TextDecoder().decode(int8);
        document.getElementById("test").src = "data:image/png;base64," + str;
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
      document.getElementById("test").src = binaryStr;
    }
    reader.readAsDataURL(file)
  };
  return (
    <div>
      <ImageViewer/>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <button id="upload" className="button-15" role="button" onClick={function(){submit()}}>Upload!</button>
    </div>
  );
}

export default DragDrop;