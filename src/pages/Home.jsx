import React, { useEffect } from "react";
import CreatePost from "../components/home/CreatePost";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { recommendedPosts } from "../context/slice/postSlice";
import PostSkeleton from "../components/global/PostSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const {
    recommended_posts: posts,
    recommended_likes: likes,
    loading,
  } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(recommendedPosts());
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
            <SinglePost key={post._id} post={post} likes={likes[i]} />
          ))}
      </div>
    </section>
  );
};

export default Home;
