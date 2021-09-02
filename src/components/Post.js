import { Avatar } from "@material-ui/core";
import {
  ChatBubbleOutline,
  ExpandMoreOutlined,
  AccountCircle,
  NearMe,
  ThumbUp,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import db, { fieldDec, fieldInc } from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";
import Modal from "../UI/Modal";
import "./Post.css";

function Post({ profilePic, image, username, timestamp, message, postId }) {
  const [isModal, setIsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { avatarMaker, currentUser } = useAuth();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState([]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: currentUser.email,
      currentTime: new Date(),
    });
    setComment("");
  };
  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("currentTime", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikeCount(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId]);
  const commentShowHandler = () => {
    setIsModal(true);
  };
  const commentHideHandler = () => {
    setIsModal(false);
  };

  const likeHandler = () => {
    const likesRef = db
      .collection("posts")
      .doc(postId)
      .collection("likes")
      .doc("likes");

    setLike(!like);
    if (like === false) {
      likesRef.set({ likes: fieldInc });
    } else {
      likesRef.update({ likes: fieldDec });
    }
  };

  return (
    <>
      {isModal && (
        <Modal onClose={commentHideHandler}>
          <div
            style={{
              flexGrow: "1",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <CloseIcon
              onClick={commentHideHandler}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <span>Comments</span>
          <div className="postModal">
            {comments.map((com) => (
              <div className="postBodyModal" key={com.id}>
                <Avatar
                  className="commetModalImage"
                  style={{
                    backgroundColor: "lightskyblue",
                    marginLeft: "8px",
                    marginTop: "35px",
                  }}
                >
                  {avatarMaker(com.username)}
                </Avatar>
                <div className="postContentModal">
                  <div className="postHeaderModal">
                    <h4 className="postAuthorModal">{com.username}</h4>
                    <span className="publishDateModal">
                      {new Date(com.currentTime?.toDate()).toLocaleString()}
                    </span>
                  </div>
                  <span className="postTextModal">{com.comment}</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={postComment} className="formModal">
            <label htmlFor="comment">Your Comment</label>
            <textarea
              id="comment"
              type="text"
              className="commetPostModal"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={!comment}
              className="commetModalButton"
            >
              Post Comment
            </button>
          </form>
        </Modal>
      )}
      <div className="post">
        <div className="post-top">
          <Avatar style={{ backgroundColor: "lightskyblue" }}>
            {avatarMaker(profilePic)}
          </Avatar>
          <div className="post-topInfo">
            <h3>{username}</h3>
            <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
          </div>
        </div>
        <div className="post-bottom">
          <p className="postMessage">{message}</p>
        </div>
        <div className="post-image">
          <img src={image} alt="" />
        </div>
        <div className="post-options">
          <div className="post-option" onClick={likeHandler}>
            {like && <ThumbUp style={{ color: "#e9103d" }} />}
            {!like && <ThumbUp />}
            <p>Like</p>

            {likeCount.map((likeData) =>
              likeData.likes === 0 ? (
                <p></p>
              ) : (
                <p key={likeData.id}>{likeData.likes}</p>
              )
            )}
          </div>

          <div className="post-option">
            <ChatBubbleOutline />
            <p onClick={commentShowHandler}>Comment</p>
          </div>

          <div className="post-option">
            <NearMe />
            <p>Share</p>
          </div>

          <div className="post-option">
            <AccountCircle />
            <ExpandMoreOutlined />
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
