import "./Notification.css";
import React, { useEffect, useState } from "react";
import db from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";
import NotificationItem from "./NotificationItem";
const Notification = () => {
  const { currentUser } = useAuth();
  const [isNotification, setIsNotification] = useState([]);
  const user = currentUser.email;

  useEffect(() => {
    db.collection("posts")
      .where("username", "!=", user)
      .limit(20)
      .onSnapshot((snapshot) =>
        setIsNotification(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [user]);
  return (
    <div className="mainbody">
      {!isNotification.length && (
        <>
          <div style={{ marginLeft: "13em" }}>
            <lottie-player
              src="https://assets8.lottiefiles.com/packages/lf20_1iNByG.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <span
            style={{
              marginTop: "30px",
              marginLeft: "14em",
            }}
          >
            {" "}
            you don't have any notification
          </span>
        </>
      )}

      {isNotification.map((notification) => (
        <NotificationItem
          key={notification.id}
          user={notification.data.username}
          message={notification.data.message}
        />
      ))}
    </div>
  );
};
export default Notification;
