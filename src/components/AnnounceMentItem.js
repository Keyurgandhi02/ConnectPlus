import { useState } from "react";
import "./AnnounceMentItem.css";
const AnnounceMentItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {props.label}
      </button>
      <div className={isOpen ? "content-show-parent" : "content-parent"}>
        <div className="content">
          <h3>{props.greetings}</h3>
          <br></br>
          <span>Date: {props.date}</span>
          <br></br>
          <br></br>
          <p style={{ wordWrap: "break-word" }}>{props.message}</p>
        </div>
      </div>
    </>
  );
};
export default AnnounceMentItem;
