import { useState, useEffect } from "react";
import Post from "./Post";
import "./Feed.css";
import db from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";

const UserPosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const user = currentUser.email;
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .where("username", "==", user)
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [user]);
  return (
    <div className="feed">
      {!posts.length && (
        <span style={{ textAlign: "center", marginTop: "30px" }}>
          {" "}
          You Don't have any post Yet!
        </span>
      )}
      {!posts.length && (
        <center>
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_1iNByG.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
        </center>
      )}
      {posts.map((post) => (
        <Post
          key={post.data.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
        />
      ))}
    </div>
  );
};

export default UserPosts;
