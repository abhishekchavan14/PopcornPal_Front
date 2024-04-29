import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { RiVideoUploadLine } from "react-icons/ri";
import { useNotification } from "../../hooks";
import { uploadTrailer } from "../../api/movie";

export default function TrailerUpload({onSubmit}) {
  const { updateNotification } = useNotification();
  const [uploadedToCloud, setUploadedToCloud] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [responseURL, setResponseURL] = useState("");
  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    const res = await uploadTrailer(formData, setUploadProgress);
    if (!res.error) {
      setUploadedToCloud(true);
      setResponseURL(res.secure_url);
    }
    console.log(res);
    onSubmit(res)
  };
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };
  return (
    <>
      {uploadedToCloud ? (
        <div className="w-[80%] md:w-[40%] h-56 flex flex-col items-center justify-center text-2xl border p-2">
          <video
            src={responseURL}
            controls
            className=" w-full h-full object-cover border-primary-red"
          ></video>
        </div>
      ) : (
        <div className=" md:w-[60%] h-56 flex items-center justify-center border border-dashed">
          <div>
            <FileUploader
              handleChange={handleChange}
              onTypeError={handleTypeError}
              types={["mp4", "avi"]}
            >
              <div className="  border-primary-red p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                <RiVideoUploadLine className="text-6xl" />
                <h1>Upload trailer here</h1>
                <h1 className="text-sm opacity-70">(Drag and Drop)</h1>
              </div>
            </FileUploader>
            <div className="animate-pulse text-center">
            {uploadProgress > 0 && uploadProgress <= 100 && <p>Uploading...</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
