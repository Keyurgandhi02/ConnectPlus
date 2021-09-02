import React from "react";
import { Avatar } from "@material-ui/core";
import "./WidgetsRow.css";

function WidgetsRow({ src, Icon, title }) {
  return (
    <div className="widgetsRow">
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
}

export default WidgetsRow;
