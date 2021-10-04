import React, { useState } from "react";
import db from "../../Auth/Firbase";
import { useAuth } from "../../Store/AuthContext";
import "./Review.css";

function Review() {
  const [review, setReview] = useState(" ");
  const [reviewData, setReviewData] = useState(" ");
  const { currentUser } = useAuth();
  const reviewHandler = (e) => {
    e.preventDefault();
    db.collection("reviews").add({
      user: currentUser.email,
      rating: review,
      ratingDesc: reviewData,
    });

    setReviewData(" ");
    setReview(" ");
  };

  return (
    <form id="feedback" onSubmit={reviewHandler}>
      <center>
        <h2>Review</h2>
      </center>

      <div className="pinfo">Give Rating</div>

      <div className="form-group">
        <div className="col-md-4 inputGroupContainer">
          <div className="input-group">
            <select
              className="form-control"
              id="rate"
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            >
              <option value="Give Rating" disabled selected>
                Rating Us
              </option>
              <option value="1 star">1</option>
              <option value="2 stars">2</option>
              <option value="3 stars">3</option>
              <option value="4 stars">4</option>
              <option value="5 stars">5</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pinfo">Write your feedback</div>

      <div className="form-group">
        <div className="col-md-4 inputGroupContainer">
          <div className="input-group">
            <textarea
              className="form-control"
              id="review"
              rows="3"
              value={reviewData}
              onChange={(e) => setReviewData(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
}

export default Review;
