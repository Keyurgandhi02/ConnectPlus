import { useEffect, useState } from "react";
import db from "../Auth/Firbase";
import AnnounceMentItem from "./AnnounceMentItem";
const AnnounceMent = () => {
  const [isAnnouncement, setIsAnnouncement] = useState([]);
  useEffect(() => {
    db.collection("announcement")
      .limit(20)
      .onSnapshot((snapshot) =>
        setIsAnnouncement(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div>
      {!isAnnouncement.length && (
        <>
          <div style={{ marginLeft: "13em" }}>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_ugfqunra.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px", marginLeft: "21em" }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <span
            style={{
              marginTop: "30px",
              marginLeft: "35em",
            }}
          >
            You don't have any announcement{" "}
          </span>
        </>
      )}
      {isAnnouncement.map((annoucement) => (
        <AnnounceMentItem
          key={annoucement.id}
          label={annoucement.data.heading}
          heading={annoucement.data.heading}
          date={annoucement.data.date}
          greetings={annoucement.data.greetings}
          message={annoucement.data.message}
        ></AnnounceMentItem>
      ))}
    </div>
  );
};
export default AnnounceMent;
