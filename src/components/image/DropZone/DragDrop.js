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
    setResultBase64File(result)
  }

  const handleChange = (file) => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
    // Do whatever you want with the file contents
      let binaryStr = reader.result
      console.log(binaryStr)
      setOriginBase64File(binaryStr);

    }
    reader.readAsDataURL(file)
  };
  return (
    <div>
      <Viewer originSrc={originBase64File} newSrc={resultBase64File}/>
      
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <Button id="upload" size={15} color={"primary"} role="button" onClick={submit}>Upload!</Button>
    </div>
  );
}

export default DragDrop;