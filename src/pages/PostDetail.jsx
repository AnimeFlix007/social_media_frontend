import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeletePost, LikePost, SinglePost } from "../context/slice/postSlice";
import Loading from "../components/global/Loading";
import "../styles/post/post-detail.css";
import { Avatar, CircularProgress } from "@mui/material";
import {
  followUser,
  savePost,
  unfollowUser,
  userProfile,
} from "../context/slice/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Comments from "../components/posts/Comments";
import {
  AddComment,
  deleteComment,
  getPostComments,
} from "../context/slice/commentSlice";
import { toast } from "react-toastify";
import { options } from "../utils/ToastOptions";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { follow_loading, followed } = useSelector((store) => store.users);
  const { comments, loading: commentsLoading } = useSelector(
    (store) => store.comments
  );
  const { post, loading, deleting } = useSelector((store) => store.posts);
  const [isFollowing, setFollowing] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSaved] = useState(false);
  const comment = useRef();

  function followUserHandler(id) {
    dispatch(followUser({ followId: id }));
  }
  function unfollowUserHandler(id) {
    dispatch(unfollowUser({ unfollowId: id }));
  }
  const handleDragStart = (e) => e.preventDefault();

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment({ commentId }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getPostComments({ postId: id }));
      });
  };

  const deletepostHandler = (postId) => {
    dispatch(DeletePost({ postId }))
      .then(unwrapResult)
      .then(() => {
        navigate("/discover");
      });
  };

  const likehandler = () => {
    setLike((prev) => !prev);
    dispatch(LikePost({ id: post._id }))
      .then(unwrapResult)
      .then((obj) => {
        if (obj.liked) {
          setLike(true);
        } else {
          setLike(false);
        }
      })
      .catch((obj) => {
        setLike(like);
        toast.error("Internal Server Error", options);
      });
  };

  const savePostHandler = () => {
    setSaved((prev) => !prev);
    dispatch(savePost({ postId: post._id }))
      .then(unwrapResult)
      .then((obj) => {
        obj.saved ? setSaved(true) : setSaved(false);
      })
      .catch((obj) => {
        setSaved(save);
        toast.error("Internal Server Error", options);
      });
  };

  function addCommentHandler() {
    if (comment.current.value.length === 0) {
      toast.warn("You cannot send empty comments ", options);
    } else {
      dispatch(AddComment({ postId: post._id, content: comment.current.value }))
        .then(unwrapResult)
        .then(() => {
          dispatch(getPostComments({ postId: id }));
        });
      comment.current.value = "";
    }
  }

  function addCommentKeyHandler(event) {
    if (event.key === "Enter") {
      if (comment.current.value.length === 0) {
        toast.warn("You cannot send empty comments ", options);
      } else {
        dispatch(
          AddComment({ postId: post._id, content: comment.current.value })
        )
          .then(unwrapResult)
          .then(() => {
            dispatch(getPostComments({ postId: id }));
          });
        comment.current.value = "";
      }
    }
  }

  useEffect(() => {
    dispatch(SinglePost({ id }))
      .then(unwrapResult)
      .then((obj) => {
        setFollowing(
          obj?.post?.user?.followers?.find((p) => p == user?.user?._id)
        );
        setLike(
          obj?.post?.likes?.find(
            (userX) => userX?.toString() === user.user._id.toString()
          )
            ? true
            : false
        );
      })
      .then(() => {
        dispatch(getPostComments({ postId: id }));
      });
  }, [dispatch, id, followed]);

  useEffect(() => {
    dispatch(userProfile({ id: user?.user?._id }))
      .then(unwrapResult)
      .then((obj) => {
        setSaved(
          obj.saved.find((post) => post.toString() === id) ? true : false
        );
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="post main">
      <div className="top">
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
        {user?.user?._id == post?.user?._id && (
          <div>
            <button className="primary-btn">Edit</button>
            {!deleting ? (
              <button
                onClick={() => deletepostHandler(post._id)}
                style={{ marginLeft: "1rem" }}
                className="danger-btn"
              >
                Delete
              </button>
            ) : (
              <button className="danger-btn">
                <CircularProgress style={{ color: "white" }} size={"1rem"} />
              </button>
            )}
          </div>
        )}
        {user?.user?._id != post?.user?._id && follow_loading && isFollowing ? (
          <button className="danger-btn">
            <CircularProgress style={{ color: "white" }} size={"1rem"} />
          </button>
        ) : (
          user?.user?._id != post?.user?._id &&
          follow_loading && (
            <button className="primary-btn">
              <CircularProgress style={{ color: "white" }} size={"1rem"} />
            </button>
          )
        )}
        {!follow_loading && user?.user?._id != post?.user?._id && (
          <>
            {isFollowing ? (
              <button
                onClick={() => unfollowUserHandler(post?.user?._id)}
                className="danger-btn"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUserHandler(post?.user?._id)}
                className="primary-btn"
              >
                Follow
              </button>
            )}
          </>
        )}
      </div>
      {post?.images?.length > 1 ? (
        <AliceCarousel
          mouseTracking
          items={post?.images?.map((img) => (
            <div className="carousel-item">
              <img
                src={img}
                loading="lazy"
                onDragStart={handleDragStart}
                role="presentation"
                className="carousel-img"
              />
            </div>
          ))}
          disableButtonsControls
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
        />
      ) : (
        <div className="single-carousel-item">
          <img
            style={{ width: "50vw" }}
            src={post?.images?.[0]}
            className="carousel-img"
          />
        </div>
      )}
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
      <div className="content">{post?.content}</div>
      <div id="post-comment-box">
        <Avatar sx={{ mt: 1 }} src={user.user.avatar} />
        <input
          onKeyDown={addCommentKeyHandler}
          ref={comment}
          className="add-comment"
          placeholder="Enter Comment..."
        />
        <i onClick={addCommentHandler} className="bx bx-send"></i>
      </div>
      <Comments
        comments={comments}
        loading={commentsLoading}
        deleteCommentHandler={deleteCommentHandler}
      />
    </div>
  );
};

export default PostDetail;
