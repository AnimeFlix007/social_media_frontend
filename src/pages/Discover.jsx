import React, { useEffect } from "react";
import "../styles/post/posts.css";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../context/slice/postSlice";
import Loading from "../components/global/Loading";

const Discover = () => {
  const dispatch = useDispatch();
  const { posts, loading,likes } = useSelector((store) => store.posts);
  useEffect(() => {
    dispatch(Posts());
  }, [dispatch]);
  return (
    <div className="main">
      <div className="post_container">
        {loading && <Loading />}
        {!loading &&
          posts.length > 0 &&
          posts?.map((post, i) => <SinglePost key={post._id} post={post} likes={likes[i]} />)}
      </div>
    </div>
  );
};

export default Discover;
