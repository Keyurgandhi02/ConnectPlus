import { Avatar } from "@material-ui/core";
import { PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuth } from "../Store/AuthContext";
import "./MessageSender.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";

function MessageSender() {
  const [IsInput, setIsInput] = useState("");
  const [error, setError] = useState("");
  const { currentUser, avatarMaker, progress } = useAuth();
  const username = avatarMaker(currentUser.email);
  const [file, setFile] = useState("");
  const [fileLoader, setFileLoader] = useState("");

  const maxFileSize = 15000000; //10MB

  const videoUploadHandler = (e) => {
    let files = e.target.files[0];
    if (files.size < maxFileSize) {
      setFile(e.target.files[0]);
      setFileLoader("Video loaded successfully");
    } else {
      setFile("");
      setError("Video file is too big please upload another video");
    }
  };
  const imageUploadHandler = (e) => {
    let files = e.target.files[0];
    if (files.size < maxFileSize) {
      setFile(e.target.files[0]);
      setFileLoader("Image loaded successfully");
    } else {
      setFile(" ");
      setError("Image is too big please upload another image");
    }
  };

  const documentUploadHandler = (e) => {
    let files = e.target.files[0];
    if (files.size < maxFileSize) {
      setFile(e.target.files[0]);
      setFileLoader("Document loaded successfully");
    } else {
      setFile(" ");
      setError("Document file is too big please upload another document");
    }
  };
  const { uploadData } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadData({
      IsInput,
      file,
      username,
    });

    setIsInput("");
    setFile("");
    setFileLoader(" ");
  };
  const time = progress > 0 && progress < 100;
  return (
    <div className="messageSender">
      {time && <div className="progress-bar">Posting...</div>}
      <span className="spanSuccess">{fileLoader}</span>
      <span className="spanError">{error}</span>

      <div className="messageSender-top">
        <Avatar style={{ backgroundColor: "lightskyblue" }}>{username}</Avatar>
        <form>
          <input
            required
            className="messageSender-input"
            placeholder={`What do you want to talk about? `}
            value={IsInput}
            onChange={(e) => setIsInput(e.target.value)}
          />

          {IsInput.length > 0 && (
            <button type="submit" onClick={handleSubmit}>
              Hidden Submit
            </button>
          )}
        </form>
      </div>

      <div className="messageSender-bottom">
        <div className="messageSender-option">
          <input
            type="file"
            onChange={videoUploadHandler}
            id="fileUpload1"
            accept="video/*"
            style={{ display: "none" }}
          />
          <Videocam style={{ color: "red" }} />
          <label htmlFor="fileUpload1">Videos</label>
        </div>

        <div className="messageSender-option">
          <input
            onChange={imageUploadHandler}
            type="file"
            id="fileUpload2"
            accept="image/*"
            style={{ display: "none" }}
          />
          <PhotoLibrary style={{ color: "green" }}></PhotoLibrary>
          <label htmlFor="fileUpload2">Photos</label>
        </div>

        <div className="messageSender-option">
          <input
            onChange={documentUploadHandler}
            type="file"
            id="fileUpload3"
            accept="application/pdf, application/vnd.ms-excel"
            style={{ display: "none" }}
          />
          <FileCopyIcon style={{ color: "orange" }} />
          <label htmlFor="fileUpload3">Documents</label>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
