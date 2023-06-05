import React from "react";
import timeAgo from "../../utils/DateConverter";
import "../../styles/post/comments.css";
import NoComments from "../../assets/nodata/NoComments.avif";
import TurnedOff from "../../assets/nodata/TurnedOff.avif";
import { Switch } from "@mui/material";
import Loading from "../global/Loading";
import { useSelector } from "react-redux";

const Comments = ({ comments, loading, deleteCommentHandler }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [checked, setChecked] = React.useState(true);
  const { userDetails } = useSelector((store) => store.auth);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="container mt-5">
      <div className="comments-heading">
        <h5>Latest Comments({comments?.length})</h5>

        <div className="buttons">
          <span className="badge">
            <span>Comments {checked ? "ON" : "OFF"}</span>
            <Switch
              checked={checked}
              onChange={handleChange}
              {...label}
              defaultChecked
            />
          </span>
        </div>
      </div>

      {loading && <Loading />}

      {!loading &&
        checked &&
        comments?.map((comment) => {
          return (
            <div
              key={comment._id}
              className="card"
              style={{ cursor: "default" }}
            >
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

              <div className="card-bottom">
                <div className="reply">
                  <small>Edit</small>
                  <span className="dots"></span>
                  {userDetails._id === comment.user._id && (
                    <>
                      <small onClick={() => deleteCommentHandler(comment._id)}>
                        Remove
                      </small>
                      <span className="dots"></span>
                    </>
                  )}
                  <small>Reply</small>
                </div>

                <div className="icons">
                  <i className="fa fa-heart icon"></i>
                  <i className="fa fa-check-circle-o icon"></i>
                </div>
              </div>
            </div>
          );
        })}

      {!loading && !checked && (
        <div className="noComments">
          <img src={TurnedOff} alt="TurnedOff" />
          <p style={{ fontSize: "1.2rem" }} className="text">
            You've turned off Comments Section!!
          </p>
        </div>
      )}

      {!loading && comments.length === 0 && checked && (
        <div className="noComments">
          <img src={NoComments} alt="NoComments" />
          <p style={{ fontSize: "1.2rem" }} className="text">
            Be The First one to comment!!
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
