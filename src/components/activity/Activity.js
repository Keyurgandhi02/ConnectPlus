import React, { useEffect, useState } from "react";
import "./Activity.css";
import db from "../../Auth/Firbase";
import { useAuth } from "../../Store/AuthContext";
function Activity() {
  const [activity, setActivity] = useState([]);
  const { currentUser } = useAuth();
  const fetchUser = currentUser.email;
  useEffect(() => {
    db.collection("contact")
      .where("user", "==", fetchUser)
      .onSnapshot((snapshot) =>
        setActivity(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [fetchUser]);

  return (
    <>
      <div className="activityItem">
        {!activity.length && (
          <div style={{ marginLeft: "18em" }}>
            <lottie-player
              src="https://assets8.lottiefiles.com/packages/lf20_1iNByG.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
        {!activity.length && (
          <span style={{ marginTop: "30px", marginLeft: "18em" }}>
            {" "}
            You don't have any contact query yet!
          </span>
        )}
        <ul>
          {activity.map((data) => (
            <>
              <li className="activityItemList" key={data.id}>
                Contact Message:- {data.data.message}
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Activity;
