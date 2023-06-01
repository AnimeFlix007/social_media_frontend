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
import "../styles/home/home.css";
import TrendingNews from "../components/home/TrendingNews";
import fetchNews from "../context/slice/fetchNews";
import { useState } from "react";
import { toast } from "react-toastify";
import { options } from "../utils/ToastOptions";
import NoSuggestedInfluencers from "../assets/nodata/NoSuggestedUsers.avif";
import { topNews } from "../__mocks__/TopNews";

const Home = () => {
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState();
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
      .then(() => {
        dispatch(suggestedUsers({ num: 5 }));
      });
  }, [dispatch]);

  async function fetchTrendingNews() {
    setNewsLoading((prev) => prev);
    fetchNews()
      .then((res) => {
        setNews(res);
      })
      .catch((err) => {
        toast.error(err.message, options);
      })
      .finally(() => {
        setNewsLoading((prev) => prev);
      });
  }

  useEffect(() => {
    dispatch(RecommendedPosts());
    // news.length === 0 && fetchTrendingNews();
  }, [dispatch]);

  return (
    <section className="main">
      <div id="home">
        <div>
          <CreatePost />
          {posts.length === 0 && <RecommendedHomePosts />}
          {posts.length > 0 && (
            <div style={{ marginTop: "2rem" }} className="home_posts_container">
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
          )}
        </div>
        <div className="suggested-users-container">
          <Typography
            style={{
              fontSize: "1.33rem",
              padding: "5px 10px",
              width: "100%",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Top Trending News
          </Typography>
          {newsLoading && news.length === 0 && (
            <CircularProgress color="primary" />
          )}
          {!newsLoading && topNews.length > 0 && (
            <TrendingNews news={topNews.slice(0, 6)} />
          )}
          {!loading && users && (
            <div className="suggested-users-box">
              <Typography
                style={{
                  fontSize: "1.33rem",
                  padding: "5px 10px",
                  width: "100%",
                  fontWeight: "600",
                  marginBottom: "10px",
                  marginTop: "1rem",
                }}
              >
                Suggested People for you
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
                  users.length > 0 &&
                  users?.map((user) => (
                    <SuggestedUser key={user?._id} user={user} />
                  ))}
                {!loader && users.length === 0 && (
                  <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <img
                      src={NoSuggestedInfluencers}
                      alt="NoSuggestedInfluencers"
                      style={{ width: "300px" }}
                    />
                    <p className="text" style={{ fontSize: "1rem" }}>No Suggested Influencers</p>
                  </div>
                )}
                {loader && <CircularProgress color="primary" />}
              </List>
            </div>
          )}
        </div>
      </div>
      {/* POSTS */}
    </section>
  );
};

export default Home;
