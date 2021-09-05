import React, { useEffect, useState } from "react";
import db from "../Auth/Firbase";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../Store/AuthContext";
import "./Friend.css";
function FriendItem() {
  const { currentUser, avatarMaker } = useAuth();
  const [isFriend, setIsFriend] = useState([]);
  const user = currentUser.email;

  const addFriendHandler = () => {
    db.collection("Friends").add({
      email: user,
      friends: isFriend,
    });
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
      {isFriend.map((friend) => (
        <li className="friend selected" key={friend.id}>
          <Avatar style={{ backgroundColor: "lightskyblue" }}>
            {avatarMaker(friend.email)}
          </Avatar>
          <div className="name">{friend.email}</div>
          <p onClick={addFriendHandler}>Connect</p>
        </li>
      ))}
    </>
  );
}

export default FriendItem;
