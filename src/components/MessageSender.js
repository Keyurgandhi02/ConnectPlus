import { Avatar } from "@material-ui/core";
import { PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuth } from "../Store/AuthContext";
import Loader from "../UI/Loader";
import "./MessageSender.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";

function MessageSender() {
  const [IsInput, setIsInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const { currentUser, avatarMaker } = useAuth();
  const username = avatarMaker(currentUser.email);
  const [file, setFile] = useState("");

  const videoUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile("");
    }
  };
  const imageUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile("");
    }
  };

  const documentUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile("");
    }
  };
  const { uploadData } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadData({
      IsInput,
      file,
      username,
    });
    setIsInput("");
    setLoading(false);
    setFile("");
  };

  return (
    <div className="messageSender">
      {Loading && <Loader />}
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

          <button type="submit" onClick={handleSubmit}>
            Hidden Submit
          </button>
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
