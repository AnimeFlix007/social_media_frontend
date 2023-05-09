import React, { useEffect, useState } from "react";
import CreatePost from "../components/home/CreatePost";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { recommendedPosts } from "../context/slice/postSlice";
import PostSkeleton from "../components/global/PostSkeleton";
import { unwrapResult } from "@reduxjs/toolkit";
import { suggestedUsers } from "../context/slice/userSlice";
import Box from "@mui/material/Box";
import { List, Typography } from "@mui/material";
import SuggestedUser from "../components/home/SuggestedUser";

const Home = () => {
  const dispatch = useDispatch();
  const {
    recommended_posts: posts,
    recommended_likes: likes,
    recommended_saved: saved,
    loading,
  } = useSelector((store) => store.posts);
  const { suggested_users: users } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(recommendedPosts())
      .then(unwrapResult)
      .then((obj) => {
        if (obj.posts.length === 0) {
          dispatch(suggestedUsers());
        }
      });
  }, [dispatch]);
  return (
    <section className="main">
      <CreatePost />
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

        {!loading && posts.length === 0 && users && (
          <Box sx={{ width: "35vw" }}>
            <Typography
              style={{
                fontSize: "1.63rem",
                padding: "5px 10px",
                width: "100%",
                fontWeight: "600",
              }}
            >
              Suggested People
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {users?.map((user) => (
                <SuggestedUser key={user?._id} user={user} />
              ))}
            </List>
          </Box>
        )}
      </div>
    </section>
  );
};

export default Home;
