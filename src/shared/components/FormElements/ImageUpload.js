import React, { useEffect, useRef, useState } from "react";

import "./ImageUpload.css";
import Button from "./Button";

function ImageUpload(props) {
  const filePickerRef = useRef();
  const [pickedFile, setPickedFile] = useState();
  const [pickedFilePreview, setPickedFilePreview] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!pickedFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedFilePreview(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }, [pickedFile]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setPickedFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={"form-control"}>
      <input
        id={props.id}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        style={{ display: "none" }}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {pickedFilePreview && <img src={pickedFilePreview} alt="Preview" />}
          {!pickedFilePreview && <p>{props.errorText}</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
