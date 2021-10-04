import React, { useEffect, useState } from "react";
import db from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";
import "./Poll.css";
function Poll() {
  const [poll, setPoll] = useState();
  const [newPoll, setNewPoll] = useState([]);
  const { currentUser } = useAuth();
  const [submitPoll, setIsSubmitPoll] = useState(false);

  const pollsubmitHandler = (e) => {
    e.preventDefault();

    db.collection("pollanswers").add({
      user: currentUser.email,
      answer: poll,
    });
    setIsSubmitPoll(true);
  };

  useEffect(() => {
    db.collection("polls")
      .limit(1)
      .onSnapshot((snap) =>
        setNewPoll(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <>
      {!submitPoll && (
        <div className="wrapper">
          {newPoll.map((datas) => (
            <>
              <span> {datas?.data?.heading}</span>
              <input
                type="radio"
                name="select"
                id="option-1"
                onChange={(e) => setPoll(e.target.value)}
                value={datas?.data?.option1}
              />
              <input
                type="radio"
                name="select"
                id="option-2"
                onChange={(e) => setPoll(e.target.value)}
                value={datas?.data?.option2}
              />
              <label htmlFor="option-1" className="option option-1">
                <div className="dot"></div>
                <span>{datas?.data?.option1}</span>
              </label>
              <label htmlFor="option-2" className="option option-2">
                <div className="dot"></div>
                <span>{datas?.data?.option2}</span>
              </label>
            </>
          ))}

          <button
            style={{
              backgroundColor: "#2541b2 ",
              border: "none",
              width: "120px",
              height: "40px",
              borderRadius: "20px",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
              marginTop: "15px",
            }}
            onClick={pollsubmitHandler}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default Poll;
