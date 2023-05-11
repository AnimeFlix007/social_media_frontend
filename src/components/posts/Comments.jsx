import React from "react";
import timeAgo from "../../utils/DateConverter";
import "../../styles/post/comments.css";

const Comments = ({ comments }) => {
  return (
    <div class="container mt-5">
      <div>
        <div>
          <div>
            <h5>Unread Comments(6)</h5>

            <div class="buttons">
              <span class="badge">
                <span>Comments "ON"</span>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    checked
                  />
                </div>
              </span>
            </div>
          </div>

          {comments?.map((comment) => {
            return (
              <div key={comment._id} class="card" style={{ cursor: "default" }}>
                <div className="card-top">
                  <div className="card-content">
                    <img src={comment.user.avatar} />
                    <span>
                      <small>{comment.user.username}</small>{" "}
                      <small>{comment.content}</small>
                    </span>
                  </div>

                  <small>{timeAgo(comment.createdAt)}</small>
                </div>

                <div class="card-bottom">
                  <div class="reply">
                    <small>Edit</small>
                    <span class="dots"></span>
                    <small>Remove</small>
                    <span class="dots"></span>
                    <small>Reply</small>
                  </div>

                  <div class="icons">
                    <i class="fa fa-heart icon"></i>
                    <i class="fa fa-check-circle-o icon"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
