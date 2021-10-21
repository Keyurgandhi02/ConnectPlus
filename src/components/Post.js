import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import db from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";
import Modal from "../UI/Modal";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Post.css";
import {
  // ChatBubbleOutline,
  Close,
} from "@material-ui/icons";

function Post({
  profilePic,
  image,
  username,
  timestamp,
  message,
  postId,
  visible,
}) {
  const [isModal, setIsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const { avatarMaker, currentUser } = useAuth();

  // Comment Section

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
          setCommentCount(snapshot.size);
        });
    }
  }, [postId]);

  useEffect(() => {
    if (image?.includes(".mp4")) {
      setIsVideo(true);
    } else if (
      image?.includes(".pdf") ||
      image?.includes(".docs") ||
      image?.includes(".doc") ||
      image?.includes(".xlsx") ||
      image?.includes(".odt") ||
      image?.includes(".xls") ||
      image?.includes(".ppt") ||
      image?.includes(".pptx") ||
      image?.includes(".txt")
    ) {
      setIsDocument(true);
    } else if (
      image?.includes(".jpg") ||
      image?.includes(".jpeg") ||
      image?.includes(".png") ||
      image?.includes(".gif") ||
      image?.includes(".webp")
    ) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
  }, [image]);

  //Comment Show and Hide Handler

  const commentShowHandler = () => {
    setIsModal(true);
  };
  const commentHideHandler = () => {
    setIsModal(false);
  };

  //delete post
  const deletePostHandler = () => {
    const response = window.confirm(
      "Are you sure you want to delete your post"
    );
    if (response === true) {
      db.collection("posts").doc(postId).delete();
    } else {
      return;
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
            <Close
              onClick={commentHideHandler}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <span></span>
          {commentCount > 0 && <span>{commentCount} Answers</span>}
          <h4>{commentCount === 0 ? "No answers start giving answer" : " "}</h4>
          <div className="postModal">
            {comments.map((com) => (
              <div className="postBodyModal">
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
            <label htmlFor="comment">Your Answer</label>
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
              Post Answer
            </button>
          </form>
        </Modal>
      )}
      <div className="post">
        {visible && (
          <button onClick={deletePostHandler} className="deletePost">
            <DeleteIcon />{" "}
          </button>
        )}
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
          {isImage && <img src={image} alt="" />}
          {isVideo && <video src={image} alt="" controls type="video/mp4" />}
          {isDocument && (
            <object data={image} type="application/pdf" title="pdf" />
          )}
        </div>
        <div className="post-options">
          <div className="post-option" onClick={commentShowHandler}>
            <h4>Post your answer</h4>
            {/* <ChatBubbleOutline /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
