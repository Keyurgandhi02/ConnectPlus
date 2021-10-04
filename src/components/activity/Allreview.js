import React, { useEffect, useState } from "react";
import "./Activity.css";
import db from "../../Auth/Firbase";
import { useAuth } from "../../Store/AuthContext";
function Allreview() {
  const [review, setReview] = useState([]);
  const { currentUser } = useAuth();
  const fetchUser = currentUser.email;
  useEffect(() => {
    db.collection("reviews")
      .where("user", "==", fetchUser)
      .onSnapshot((snapshot) =>
        setReview(
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
        {!review.length && (
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
        {!review.length && (
          <span style={{ marginTop: "30px", marginLeft: "20em" }}>
            {" "}
            Please review us ☹☹
          </span>
        )}
        <ul>
          {review.map((data) => (
            <>
              <li className="activityItemList" key={data.id}>
                Contact Message:- {data.data.ratingDesc}
                <br />
                <br />
                Rating:- {data.data.rating}
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Allreview;
