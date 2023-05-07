import React, { useEffect, useState } from "react";
import "../../styles/post/singlepost.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikePost } from "../../context/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const SinglePost = ({ post, likes }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const likehandler = () => {
    setLike((prev) => !prev);
    dispatch(LikePost({ id: post._id }))
      .then(unwrapResult)
      .then((obj) => {
        obj.liked ? setLike(true) : setLike(false);
      })
      .catch((obj) => {
        setLike(like);
        toast.error("Internal Server Error", options)
      });
  };

  useEffect(() => {
    setLike(likes);
  }, [likes]);

  return (
    <div className="card" onClick={() => navigate(`/discover/${post?._id}`)}>
      <div className="top">
        <div className="user-details">
          <div className="user-profile_img">
            <img
              src={post?.user?.avatar}
              alt={post?.user?.username}
              className="cover"
            />
          </div>
          <h3>
            {post?.user?.fullname || post?.user?.username} <br />{" "}
            <span>{post?.user?.role}</span>
          </h3>
        </div>
        <div className="dot">
          <i className="bx bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <div className="imageBx">
        <img src={post?.images?.[0]} alt={post?.content} className="cover" />
      </div>
      <div className="action-btns" onClick={(e) => e.stopPropagation()}>
        <div className="left">
          {!like && (
            <i
              onClick={likehandler}
              id="like-animation"
              className="bx bx-heart"
            ></i>
          )}
          {like && (
            <i
              onClick={likehandler}
              style={{ color: "red" }}
              className="bx bxs-heart"
              id="like-animation2"
            ></i>
          )}
          <i className="bx bx-message-rounded"></i>
          <i className="bx bx-share-alt"></i>
        </div>
        <div className="right">
          <i className="bx bx-bookmark"></i>
        </div>
      </div>
      <h4 className="likes">3,657 Likes</h4>
      <h4 className="message">
        <b>{post?.user?.fullname || post?.user?.username}</b> {post?.content}{" "}
        <span>#onepiece</span>
        <span>#anime</span>
      </h4>
      <h4 className="comments">View all 342 comments</h4>
      <div onClick={(e) => e.stopPropagation()} className="add-comment">
        <div className="user-img">
          <img
            className="cover"
            src={user?.user?.avatar}
            alt={user?.user?.username}
          />
        </div>
        <input className="input-text" type="text" placeholder="Add a comment" />
      </div>
      <h5 className="post-time">4 hours ago</h5>
    </div>
  );
};

export default SinglePost;
