import React, { useEffect } from "react";
import CreatePost from "../components/home/CreatePost";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { ExplorePosts, RecommendedPosts } from "../context/slice/postSlice";
import PostSkeleton from "../components/global/PostSkeleton";
import { unwrapResult } from "@reduxjs/toolkit";
import { suggestedUsers } from "../context/slice/userSlice";
import { CircularProgress, List, Typography } from "@mui/material";
import SuggestedUser from "../components/home/SuggestedUser";
import RecommendedHomePosts from "../components/home/RecommendedPosts";
import "../styles/home/home.css"

const Home = () => {
  const dispatch = useDispatch();
  const {
    explore_posts: posts,
    explore_likes: likes,
    explore_saved: saved,
    loading,
  } = useSelector((store) => store.posts);
  const { suggested_users: users, loader } = useSelector(
    (store) => store.users
  );

  useEffect(() => {
    dispatch(ExplorePosts())
      .then(unwrapResult)
      .then((obj) => {
        if (obj.posts.length === 0) {
          dispatch(suggestedUsers({ num: 5 }));
        }
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(RecommendedPosts());
  }, [dispatch]);

  return (
    <section className="main">
      <div id="home">
        <div>
          <CreatePost />
          {posts.length === 0 && <RecommendedHomePosts />}
        </div>
        <div style={{ paddingLeft: "2rem", position: "sticky" }}>
          {!loading && posts.length === 0 && users && (
            <div className="suggested-users-box">
              <Typography
                style={{
                  fontSize: "1.33rem",
                  padding: "5px 10px",
                  width: "100%",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                Suggested People
              </Typography>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!loader &&
                  users?.map((user) => (
                    <SuggestedUser key={user?._id} user={user} />
                  ))}
                {loader && <CircularProgress color="primary" />}
              </List>
            </div>
          )}
        </div>
      </div>

      {/* POSTS */}
      <div style={{ marginTop: "2rem" }} className="post_container grid3">
        {loading && (
          <React.Fragment>
            <PostSkeleton />
            <PostSkeleton />
          </React.Fragment>
        )}
        {!loading &&
          posts.length > 0 &&
          posts?.map((post, i) => (
            <SinglePost
              key={post._id}
              post={post}
              likes={likes[i]}
              saved={saved?.[i]}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
