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
      {/* story */}
      {/* <StroyReel /> */}
      {/* MessageSender */}
      <MessageSender />
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
