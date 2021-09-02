import { Avatar } from "@material-ui/core";
import { InsertEmoticon, PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuth } from "../Store/AuthContext";
import Loader from "../UI/Loader";
import "./MessageSender.css";

function MessageSender() {
  const [IsInput, setIsInput] = useState("");
  const [IsUrl, setIsUrl] = useState("");
  const [Loading, setLoading] = useState(false);
  const { currentUser, avatarMaker } = useAuth();
  const username = avatarMaker(currentUser.email);
  const [file, setFile] = useState("");

  const imageUploadHandler = (e) => {
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
    setIsUrl("");
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
            placeholder={`What's on your mind? `}
            value={IsInput}
            onChange={(e) => setIsInput(e.target.value)}
          />
          <input
            placeholder="image URL(Optional)"
            value={IsUrl}
            onChange={(e) => setIsUrl(e.target.value)}
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
            id="fileUpload1"
            accept="video"
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
            accept="image"
            style={{ display: "none" }}
          />
          <PhotoLibrary style={{ color: "green" }}></PhotoLibrary>
          <label htmlFor="fileUpload2">Photos</label>
        </div>

        <div className="messageSender-option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
