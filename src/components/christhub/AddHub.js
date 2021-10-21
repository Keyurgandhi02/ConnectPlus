import React, { useState } from "react";
import db from "../../Auth/Firbase";
import { useAuth } from "../../Store/AuthContext";
import "../../components/OtherPages/Review.css";
import ControlPoint from "@material-ui/icons/Add";
import "./AddHub.css";
function AddHub() {
  const [isName, setName] = useState("");
  const [isGender, setGender] = useState("");
  const [isRank, setRank] = useState("");
  const [isEvent, setEvent] = useState("");
  const [isDesc, setDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const reviewHandler = (e) => {
    e.preventDefault();

    db.collection("EventRecords").doc(isEvent).collection(isEvent).add({
      name: isName,
      email: currentUser.email,
      rank: isRank,
      gender: isGender,
      desc: isDesc,
      event: isEvent,
      currentTime: new Date(),
    });
    setRank(" ");
    setName(" ");
    setGender(" ");
    setDesc(" ");
    setEvent(" ");
    setIsOpen(false);
  };
  return (
    <>
      <button className="toggle-btnHub" onClick={() => setIsOpen(!isOpen)}>
        <ControlPoint />
      </button>
      <div className={isOpen ? "content-show-parentHub" : "content-parentHub"}>
        <div className="contentHub">
          <div className="divHub">
            <form>
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                id="fname"
                value={isName}
                onChange={(e) => setName(e.target.value)}
                required
                className="inputHub"
                name="firstname"
                placeholder="Your name.."
              />

              <label htmlFor="lname">Rank</label>
              <input
                type="number"
                id="lname"
                value={isRank}
                onChange={(e) => setRank(e.target.value)}
                name="lastname"
                className="inputHub"
                placeholder="Your Rank.."
              />

              <label htmlFor="Description">Description</label>
              <input
                type="text"
                id="Description"
                name="Description"
                value={isDesc}
                onChange={(e) => setDesc(e.target.value)}
                className="inputHub"
                placeholder="Your Description.."
              />

              <label htmlFor="Event">Select Event</label>
              <select
                id="Event"
                name="Event"
                required
                className="selectHub"
                value={isEvent}
                onChange={(e) => setEvent(e.target.value)}
              >
                <option value="Select Event" disabled>
                  Select Event
                </option>
                <option value="Music">Music Event</option>
                <option value="Coding">Coding Event</option>
                <option value="Drawing">Drawing Event</option>
                <option value="Running ">Running Event</option>
                <option value="Singing">Singing Event</option>
              </select>

              <label htmlFor="country">Gender</label>
              <select
                id="country"
                required
                name="country"
                className="selectHub"
                value={isGender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Select Gender" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button
                type="button"
                className="btnHubSubmit"
                onClick={reviewHandler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddHub;
