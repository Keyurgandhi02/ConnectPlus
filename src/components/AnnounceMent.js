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
          <span style={{ textAlign: "center", marginTop: "30px" }}></span>
          <center>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_ugfqunra.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </center>
        </>
      )}
      {isAnnouncement.map((annoucement) => (
        <AnnounceMentItem
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
