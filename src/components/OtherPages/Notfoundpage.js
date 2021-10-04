import React from "react";
import { useHistory } from "react-router";

function Notfoundpage() {
  const history = useHistory();
  return (
    <>
      <center>
        <lottie-player
          src="https://assets7.lottiefiles.com/packages/lf20_ghfpce1h.json"
          background="transparent"
          speed="1"
          style={{ width: "450px", height: "450px" }}
          loop
          autoplay
        ></lottie-player>

        <button
          style={{
            marginTop: "4em",
            backgroundColor: "#2541b2 ",
            border: "none",
            cursor: "pointer",
            width: "270px",
            height: "40px",
            borderRadius: "10px",
            color: "white",
            fontSize: "15px",
          }}
          onClick={() => {
            history.replace("/");
          }}
        >
          Go back to Recommended Page
        </button>
      </center>
    </>
  );
}

export default Notfoundpage;
