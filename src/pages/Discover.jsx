import React, { useEffect, useState } from "react";
import "../styles/post/posts.css";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../context/slice/postSlice";
import PostSkeleton from "../components/global/PostSkeleton";

const Discover = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, loading, likes, saved } = useSelector((store) => store.posts);

  function handleScroll() {
    const heightOfApp = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollFromTop = document.documentElement.scrollTop;

    if (windowHeight + scrollFromTop + 1 >= heightOfApp) {
      console.log("api call");
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    dispatch(Posts({ page }));
  }, [page]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () =>window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="main">
      <div className="post_container">
        {loading && (
          <React.Fragment>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
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
              saved={saved[i]}
            />
          ))}
      </div>
    </div>
  );
};

export default Discover;
