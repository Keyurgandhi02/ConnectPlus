import React, { useEffect, useState } from "react";
import db from "../Auth/Firbase";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../Store/AuthContext";
import "./Friend.css";
function FriendItem() {
  const { currentUser, avatarMaker } = useAuth();
  const [isFriend, setIsFriend] = useState([]);
  const [follow, SetFollow] = useState(false);
  const user = currentUser.email;

  const addFriendHandler = () => {
    db.collection("Friends").add({
      email: user,
      friends: isFriend,
    });
    SetFollow(true);
  };

  useEffect(() => {
    db.collection("userRegister")
      .where("email", "!=", user)
      .onSnapshot((snapshot) => {
        setIsFriend(snapshot.docs.map((doc) => doc.data()));
      });
  }, [user]);

  return (
    <>
      {isFriend.map((friend, index) => (
        <React.Fragment key={index}>
          <li className="friend selected">
            <Avatar style={{ backgroundColor: "lightskyblue", float: "left" }}>
              {avatarMaker(friend.email)}
            </Avatar>
            <div className="name">{friend.email}</div>
            <p onClick={addFriendHandler} className="titleConnect">
              {!follow && "Connect"}
              {follow && "Remove"}
            </p>
          </li>
        </React.Fragment>
      ))}
    </>
  );
}

export default FriendItem;
