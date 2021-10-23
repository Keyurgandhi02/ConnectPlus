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
      .orderBy("streamTime", "desc")
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
      {isStreams?.map((data) => (
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
      {!isStreams.length && (
        <div className="noStreamsDiv">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_wrv4fzkk.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      )}

      {!isStreams.length && (
        <span
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginLeft: "30em",
            color: "#9f9b9a",
          }}
        >
          {" "}
          We Will Notify You When We Are Live
        </span>
      )}

      <Link to="/home" className="floatButton">
        <HomeIcon className="my-float" fontSize="large" />
      </Link>
    </div>
  );
}

export default Livetv;
