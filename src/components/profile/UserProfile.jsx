import React, { useState } from "react";
import "../../styles/profile/profile.css";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CloseFriend,
  followUser,
  unfollowUser,
} from "../../context/slice/userSlice";
import FollowersDrawer from "./FollowersDrawer";
import FollowingDrawer from "./FollowingDrawer";
import SinglePost from "../posts/SinglePost";
import NoImages from "../../assets/nodata/NoImages.avif";
import NoPosts from "../../assets/nodata/NoPosts.avif";
import { unwrapResult } from "@reduxjs/toolkit";

const UserProfile = ({ profile, loading, isCloseFriend, setIsCloseFriend }) => {
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const {
    images,
    user_posts,
    user_likes,
    loading: postLoading,
    image_loading,
    savedPostsloading,
    saved_posts,
    saved_posts_likes,
    saved_posts_saved,
  } = useSelector((store) => store.posts);

  const isFollowing = profile?.followers?.find((p) => p._id == user?.user?._id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateToEditProfileHandler = () => {
    navigate(`/edit-profile/${user?.user?._id}`);
  };

  function followUserHandler(id) {
    dispatch(followUser({ followId: id }));
  }
  function unfollowUserHandler(id) {
    dispatch(unfollowUser({ unfollowId: id }));
  }

  function closeFriendsHandler() {
    dispatch(CloseFriend({ friendId: profile._id }))
      .then(unwrapResult)
      .then((obj) => {
        setIsCloseFriend(prev => !prev)
      });
  }

  console.log(isCloseFriend);

  return (
    <div className="header__wrapper">
      <header>
        <img src={profile?.bg_image} alt="bg_image" />
      </header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={profile?.avatar} alt={profile?.username} />
            <span></span>
          </div>
          {profile?.fullname && (
            <h2>
              {profile?.fullname}
              {user.user._id != profile?._id && (
                <>
                  {!isCloseFriend ? (
                    <i
                      onClick={closeFriendsHandler}
                      className="bx bx-star icon"
                    ></i>
                  ) : (
                    <i
                      onClick={closeFriendsHandler}
                      className="bx bxs-star icon"
                    ></i>
                  )}
                </>
              )}
            </h2>
          )}
          <h3>@{profile?.username}</h3>
          <p style={{ marginTop: "1rem" }}>{profile?.role}</p>
          <p>{profile?.email}</p>

          <ul className="about">
            <FollowersDrawer profile={profile} />
            <FollowingDrawer profile={profile} />
            <li>
              <span>{user_posts?.length || 0}</span>Posts
            </li>
            <li>
              <span>
                {user_posts?.reduce(
                  (acc, post) => acc + post.likes.length,
                  0
                ) || 0}
              </span>
              Lkes
            </li>
          </ul>
          <div className="content">
            <p>{profile?.story}</p>

            <ul>
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  profile?.instagram
                    ? "https://www.instagram.com/" + profile?.instagram
                    : "https://www.instagram.com"
                }
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  profile?.website
                    ? "https://" + profile?.website
                    : "https://www.google.com"
                }
                style={{ marginLeft: "1rem" }}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </ul>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab value={1} label="Photos" />
              <Tab value={2} label="Posts" />
              <Tab value={3} label="Close Friends" />
              <Tab value={4} label="Saved" />
            </Tabs>
            {loading && isFollowing ? (
              <button className="danger-btn">
                <CircularProgress style={{ color: "white" }} size={"1rem"} />
              </button>
            ) : (
              loading && (
                <button className="primary-btn">
                  <CircularProgress style={{ color: "white" }} size={"1rem"} />
                </button>
              )
            )}
            {!loading && (
              <>
                {profile._id === user?.user?._id ? (
                  <button
                    className="primary-btn"
                    onClick={navigateToEditProfileHandler}
                  >
                    Edit
                  </button>
                ) : isFollowing ? (
                  <button
                    onClick={() => unfollowUserHandler(profile._id)}
                    className="danger-btn"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followUserHandler(profile._id)}
                    className="primary-btn"
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </nav>

          {value === 1 && (
            <>
              <div className="photos">
                {!image_loading &&
                  images.length > 0 &&
                  images
                    ?.slice(0, 6)
                    ?.map((img) => <img key={img} src={img} alt="Photo" />)}
              </div>
              {!image_loading && images.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <img src={NoImages} alt="NoImages" style={{ width: "50%" }} />
                </div>
              )}
            </>
          )}
          {value === 2 && (
            <>
              <div className="post_container">
                {!postLoading &&
                  user_posts
                    ?.slice(0, 2)
                    ?.map((post, i) => (
                      <SinglePost
                        key={post._id}
                        post={post}
                        likes={user_likes[i]}
                      />
                    ))}
              </div>
              {user_posts.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <img src={NoPosts} alt="NoPosts" style={{ width: "50%" }} />
                </div>
              )}
              {user_posts.length > 2 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button style={{ marginTop: "0%" }} className="primary-btn">
                    View More
                  </button>
                </div>
              )}
            </>
          )}
          {value === 3 && (
            <>
              <div className="photos">
                {!image_loading &&
                  images.length > 0 &&
                  images
                    ?.slice(0, 6)
                    ?.map((img) => <img src={img} alt="Photo" />)}
              </div>
              {!image_loading && images.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <img src={NoImages} alt="NoImages" style={{ width: "50%" }} />
                </div>
              )}
            </>
          )}
          {value === 4 && (
            <>
              <div className="post_container">
                {!savedPostsloading &&
                  saved_posts
                    ?.slice(0, 2)
                    ?.map((post, i) => (
                      <SinglePost
                        key={post._id}
                        post={post}
                        likes={saved_posts_likes[i]}
                        saved={saved_posts_saved[i]}
                      />
                    ))}
              </div>
              {saved_posts.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <img src={NoPosts} alt="NoPosts" style={{ width: "50%" }} />
                </div>
              )}
              {saved_posts.length > 2 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button style={{ marginTop: "0%" }} className="primary-btn">
                    View More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
