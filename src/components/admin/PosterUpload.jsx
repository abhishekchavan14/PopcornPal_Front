import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { RiVideoUploadLine } from "react-icons/ri";
import { useNotification } from "../../hooks";

export default function PosterUpload({onUpload}) {
  const {updateNotification} = useNotification()
  const handleChange = (file) => {
    onUpload(file)
    console.log(file)
  };
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };
  return (
    <div className="">
      <FileUploader
        handleChange={handleChange}
        onTypeError={handleTypeError}
        types={["jpeg", "jpg", "heif", "heic", "png"]}
      >
        <div className="  border-primary-red p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer">
          <RiVideoUploadLine className="text-6xl" />
          <h1>Upload trailer here</h1>
          <h1 className="text-sm opacity-70">(Drag and Drop)</h1>
        </div>
      </FileUploader>
    </div>
  );
}
