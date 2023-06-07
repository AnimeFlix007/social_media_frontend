import React, { useEffect, useState, useRef } from "react";
import "../../styles/post/singlepost.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikePost } from "../../context/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";
import { savePost } from "../../context/slice/userSlice";
import timeAgo from "../../utils/DateConverter";
import { AddComment } from "../../context/slice/commentSlice";

const SinglePost = ({ post, likes, saved }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const comment = useRef();

  const likehandler = () => {
    setLike((prev) => !prev);
    dispatch(LikePost({ id: post._id }))
      .then(unwrapResult)
      .then((obj) => {
        if (obj.liked) {
          setLike(true);
          setCount(true);
        } else {
          setLike(false);
          setCount(false);
        }
      })
      .catch((obj) => {
        setLike(like);
        toast.error("Internal Server Error", options);
      });
  };

  const savePostHandler = () => {
    setSave((prev) => !prev);
    dispatch(savePost({ postId: post._id }))
      .then(unwrapResult)
      .then((obj) => {
        obj.saved ? setSave(true) : setSave(false);
      })
      .catch((obj) => {
        setSave(save);
        toast.error("Internal Server Error", options);
      });
  };

  function showLikes() {
    if (count === true) {
      return post?.likes?.length + 1;
    } else if (count === false) {
      return post?.likes?.length - 1;
    } else {
      return post?.likes?.length || 0;
    }
  }

  function naviagteKeyHandler(event) {
    if (event.key === "Enter") {
      if (comment.current.value.length === 0) {
        toast.warn("You cannot send empty comments ", options);
      } else {
        dispatch(AddComment({ postId: post._id, content: comment.current.value }));
        comment.current.value = "";
      }
    }
  }

  function addCommentHandler() {
    if (comment.current.value.length === 0) {
      toast.warn("You cannot send empty comments ", options);
    } else {
      dispatch(AddComment({ postId: post._id, content: comment.current.value }));
      comment.current.value = "";
    }
  }

  useEffect(() => {
    setLike(likes);
  }, [likes]);

  useEffect(() => {
    setSave(saved);
  }, [saved]);

  return (
    <div className="card" onClick={() => navigate(`/discover/${post?._id}`)}>
      <div className="top" onClick={(e) => e.stopPropagation()}>
        <div className="user-details">
          <div className="user-profile_img">
            <img
              src={post?.user?.avatar}
              alt={post?.user?.username}
              className="cover"
            />
          </div>
          <h3 onClick={() => navigate(`/profile/${post?.user?._id}`)}>
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
          {!save && (
            <i onClick={savePostHandler} className="bx bx-bookmark"></i>
          )}
          {save && (
            <i onClick={savePostHandler} className="bx bxs-bookmark"></i>
          )}
        </div>
      </div>
      <h4 className="likes">{showLikes()} Likes</h4>
      <h4 className="message">
        <b>{post?.user?.fullname || post?.user?.username}</b> {post?.content}{" "}
        <span>#onepiece</span>
        <span>#anime</span>
      </h4>
      <h4 className="comments">View all comments</h4>
      <div onClick={(e) => e.stopPropagation()} className="add-comment">
        <div className="user-img">
          <img
            className="cover"
            src={user?.user?.avatar}
            alt={user?.user?.username}
          />
        </div>
        <input
          onKeyDown={naviagteKeyHandler}
          ref={comment}
          className="input-text"
          type="text"
          placeholder="Add a comment"
        />
        <i onClick={addCommentHandler} className="bx bx-send"></i>
      </div>
      <h5 className="post-time">{timeAgo(post.createdAt)}</h5>
    </div>
  );
};

export default SinglePost;
