import { Avatar } from "@material-ui/core";
import React from "react";
import "./Story.css";
function Story({ image, ProfileSrc, title }) {
  return (
    <div style={{ backgroundImage: `URL(${image})` }} className="story">
      <Avatar src={ProfileSrc} className="story-avatar" />
      <h4>{title}</h4>
    </div>
  );
}

export default Story;
