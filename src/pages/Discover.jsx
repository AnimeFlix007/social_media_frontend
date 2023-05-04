import React, { useEffect } from "react";
import "../styles/post/posts.css";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../context/slice/postSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.posts);
  useEffect(() => {
    dispatch(Posts());
  }, [dispatch]);
  return (
    <div className="main">
      <div className="post_container">
        {posts?.map((post) => (
          <SinglePost post={post} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
