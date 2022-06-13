import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { TextDecoder } from "text-encoding";
import Viewer from "../Viewer/Viewer";
import { sendMediaFile } from "../../../utils/api";
import Button from "../../elements/Button";

const fileTypes = ["JPG", "PNG", "GIF", "mp4"];

const DragDrop = () => {

  const [originBase64File, setOriginBase64File] = useState('');
  const [resultBase64File, setResultBase64File] = useState('');
  
  const submit = async () => {
    setOriginBase64File(originBase64File)
    const result = await sendMediaFile(originBase64File);
    console.log("result: "+result)
    setResultBase64File(result)
  }

  const handleChange = (file) => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
    // Do whatever you want with the file contents
      let binaryStr = reader.result
      setOriginBase64File(binaryStr);
      setResultBase64File('');

    }
    reader.readAsDataURL(file)
  };
  return (
    <>
      <Viewer originSrc={originBase64File} newSrc={resultBase64File}/>
      <div style={{ margin: "auto", marginBottom: "15px"}}> 
        <FileUploader  handleChange={handleChange} name="file" types={fileTypes} />
      </div>
      <div style={{ margin: "auto"}}> 
        <Button id="upload"  color={"primary"} role="button" onClick={submit}>Upload!</Button>
      </div>
    </>
  );
}

export default DragDrop;