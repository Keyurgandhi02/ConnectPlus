import React from "react";
import db from "../Auth/Firbase";
import DeleteIcon from "@material-ui/icons/Delete";

function DeletePost({ postId }) {
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
      <button
        onClick={deletePostHandler}
        style={{
          margin: "20px",
          cursor: "pointer",
          width: "75%",
          borderRadius: "12px",
          height: "33px",
          border: "none",
          backgroundColor: "#bd1616",
          color: "white",
        }}
      >
        <DeleteIcon />
      </button>
    </>
  );
}

export default DeletePost;
