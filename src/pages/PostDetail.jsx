import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SinglePost } from "../context/slice/postSlice";
import Loading from "../components/global/Loading";
import "../styles/post/post-detail.css";
import { CircularProgress } from "@mui/material";
import { followUser, unfollowUser } from "../context/slice/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { follow_loading, followed } = useSelector((store) => store.users);
  const { post, loading } = useSelector((store) => store.posts);
  const [isFollowing, setFollowing] = useState(false);
    const [like, setLike] = useState(false);

  function followUserHandler(id) {
    dispatch(followUser({ followId: id }));
  }
  function unfollowUserHandler(id) {
    dispatch(unfollowUser({ unfollowId: id }));
  }
  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    dispatch(SinglePost({ id }))
      .then(unwrapResult)
      .then((obj) => {
        setFollowing(
          obj?.post?.user?.followers?.find((p) => p == user?.user?._id)
        );
      });
  }, [dispatch, id, followed]);

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
          <h3>
            {post?.user?.fullname || post?.user?.username} <br />{" "}
            <span>{post?.user?.role}</span>
          </h3>
        </div>
        {follow_loading && isFollowing ? (
          <button className="danger-btn">
            <CircularProgress style={{ color: "white" }} size={"1rem"} />
          </button>
        ) : (
          follow_loading && (
            <button className="primary-btn">
              <CircularProgress style={{ color: "white" }} size={"1rem"} />
            </button>
          )
        )}
        {!follow_loading && (
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
              onClick={() => setLike((prev) => !prev)}
              id="like-animation"
              class="bx bx-heart"
            ></i>
          )}
          {like && (
            <i
              onClick={() => setLike((prev) => !prev)}
              style={{ color: "red" }}
              class="bx bxs-heart"
              id="like-animation2"
            ></i>
          )}
          <i class="bx bx-message-rounded"></i>
          <i class="bx bx-share-alt"></i>
        </div>
        <div className="right">
          <i class="bx bx-bookmark"></i>
        </div>
      </div>
      <div className="content">{post?.content}</div>
    </div>
  );
};

export default PostDetail;
