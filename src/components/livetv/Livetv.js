import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import db from "../../Auth/Firbase";
import "./Livetv.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

function Livetv() {
  const [isStreams, setStreams] = useState([]);
  useEffect(() => {
    db.collection("streams")
      .orderBy("time", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        setStreams(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div>
      {isStreams.map((data) => (
        <div className="mainPlayer">
          <ReactPlayer
            url={data.data.url}
            width="90vh"
            height="50vh"
            controls
            pip="true"
          />
        </div>
      ))}
      <Link to="/home" className="floatButton">
        <HomeIcon className="my-float" fontSize="large" />
      </Link>
    </div>
  );
}

export default Livetv;
