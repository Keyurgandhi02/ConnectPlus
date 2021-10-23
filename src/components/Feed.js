import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../Auth/Firbase";
function Feed() {
  const [posts, setPosts] = useState([]);
  const loadSize = 10;
  const [load, setLoad] = useState(loadSize);
  const [isLoadSize, setLoadSize] = useState();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .limit(load)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoadSize(snapshot.size);
      });
  }, [load]);

  const loadMoreHandler = () => {
    setLoad(load + 10);
  };

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
        <span
          style={{ textAlign: "center", marginTop: "50px", color: "#9f9b9a" }}
        >
          {" "}
          You Don't Have Any Post Start To Create It
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

      {isLoadSize >= load && (
        <button
          onClick={loadMoreHandler}
          style={{
            color: "white",
            backgroundColor: "#2541b2 ",
            border: "none",
            borderRadius: "20px",
            textAlign: "center",
            fontSize: "14px",
            cursor: "pointer",
            width: "200px",
            height: "35px",
            marginTop: "3em",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Feed;
