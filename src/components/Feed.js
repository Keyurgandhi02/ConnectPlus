import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../Auth/Firbase";
function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="feed">
      <MessageSender />

      {!posts.length && (
        <center>
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_tnrzlN.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
        </center>
      )}

      {!posts.length && (
        <span style={{ textAlign: "center", marginTop: "50px" }}>
          {" "}
          You Don't have any post start to Create it
        </span>
      )}
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
        />
      ))}
    </div>
  );
}

export default Feed;
