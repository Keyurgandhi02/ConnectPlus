import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import db, { fieldDec, fieldInc } from "../Auth/Firbase";
import { useAuth } from "../Store/AuthContext";
import Modal from "../UI/Modal";
import "./Post.css";
import {
  ChatBubbleOutline,
  ThumbDown,
  PersonAdd,
  ThumbUp,
  Close,
} from "@material-ui/icons";

function Post({ profilePic, image, username, timestamp, message, postId }) {
  const [isModal, setIsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const { avatarMaker, currentUser } = useAuth();
  const [like, setLike] = useState(false);
  const [dislike, setDisLike] = useState(false);

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

  //Like Handler
  const likeHandler = () => {
    const likesRef = db
      .collection("posts")
      .doc(postId)
      .collection("likes")
      .doc("likes");

    setLike(!like);

    if (like === false) {
      likesRef.set({ likes: fieldInc }, { merge: true });
    } else {
      likesRef.update({ likes: fieldDec });
    }
  };

  //Dislike Handler
  const disLikeHandler = () => {
    const dislikesRef = db
      .collection("posts")
      .doc(postId)
      .collection("Dislikes")
      .doc("Dislikes");

    setDisLike(!dislike);

    if (dislike === false) {
      dislikesRef.set({ Dislikes: fieldInc }, { merge: true });
    } else {
      dislikesRef.update({ Dislikes: fieldDec });
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
          <span>{commentCount} Comments</span>
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
          {isImage && <img src={image} alt="" />}
          {isVideo && <video src={image} alt="" controls type="video/mp4" />}
          {isDocument && (
            <object data={image} type="application/pdf" title="pdf" />
          )}
        </div>
        <div className="post-options">
          <div className="post-option" onClick={likeHandler}>
            {like && <ThumbUp style={{ color: "#e9103d" }} />}
            {!like && <ThumbUp />}
            {/* <p>Like</p> */}

            {/* {likeCount.map((likeData) =>
              likeData.likes === 0 ? (
                <p></p>
              ) : (
                <p key={likeData.id}>{likeData.likes}</p>
              )
            )} */}
          </div>

          <div className="post-option" onClick={disLikeHandler}>
            {dislike && <ThumbDown style={{ color: "#e9103d" }} />}
            {!dislike && <ThumbDown />}
            {/* <p style={{ marginBottom: "3px" }}>Dislike</p> */}

            {/* {dislikeCount.map((likeData) =>
              likeData.Dislikes === 0 ? (
                <p></p>
              ) : (
                <p style={{ marginBottom: "3px" }} key={likeData.id}>
                  {likeData.Dislikes}
                </p>
              )
            )} */}
          </div>
          <div className="post-option" onClick={commentShowHandler}>
            <ChatBubbleOutline />
          </div>

          <div className="post-option">
            <PersonAdd />
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
