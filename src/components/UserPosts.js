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
        <div style={{ marginLeft: "12em" }}>
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
      {!posts.length && (
        <span
          style={{ textAlign: "center", marginTop: "30px", marginLeft: "12em" }}
        >
          {" "}
          You Don't have any post Yet!
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
          visible={true}
        />
      ))}
    </div>
  );
};

export default UserPosts;
