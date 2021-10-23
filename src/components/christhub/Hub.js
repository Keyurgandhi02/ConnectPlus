import React, { useState } from "react";
import "./Hub.css";
import db from "../../Auth/Firbase";
import MostFilter from "./MostFilter";
import HubCard from "./HubCard";
import AddHub from "./AddHub";
function Hub() {
  const [isData, setIsData] = useState([]);
  const [isValue, setValue] = useState(" ");

  const clickHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setValue(value);
    db.collection("EventRecords")
      .doc(value)
      .collection(value)
      .orderBy("currentTime", "desc")
      .onSnapshot((snapshot) => {
        setIsData(snapshot.docs.map((doc) => doc.data()));
      });
  };

  return (
    <>
      <div className="nav-list-container">
        <AddHub />
        <div className="nav-list">
          <MostFilter name="Sports" clickHandler={clickHandler} />
          <MostFilter name="Tech" clickHandler={clickHandler} />
          <MostFilter name="Gatways" clickHandler={clickHandler} />

          <div className="select">
            <select defaultValue="Others" onChange={clickHandler}>
              <option value="Others" disabled>
                Others
              </option>

              <option value="Music">Music Event</option>
              <option value="Coding">Coding Event</option>
              <option value="Drawing">Drawing Event</option>
              <option value="Running ">Running Event</option>
              <option value="Singing">Singing Event</option>
            </select>
          </div>
        </div>
        {isData.length !== 0 && (
          <h2 style={{ marginLeft: "2em" }}>{isValue} Event Data</h2>
        )}
        <div className="table-users">
          <table cellSpacing="0">
            <tbody>
              {isData.length !== 0 && (
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Rank</th>
                  <th>View More</th>
                </tr>
              )}

              {isData?.map((data, index) => (
                <HubCard
                  key={index}
                  count={index + 1}
                  name={data.name}
                  rank={data.rank}
                  email={data.email}
                />
              ))}
            </tbody>
          </table>
        </div>

        {!isData.length && (
          <>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_ugfqunra.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px", marginLeft: "21em" }}
              loop
              autoplay
            ></lottie-player>
            <span
              style={{
                textAlign: "center",
                marginLeft: "21em",
                color: "#9f9b9a",
              }}
            >
              Please Select Category For View Data
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default Hub;
