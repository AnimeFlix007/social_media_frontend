import React from "react";
import PostSkeleton from "../global/PostSkeleton";
import { useSelector } from "react-redux";
import SinglePost from "../posts/SinglePost";

const RecommendedPosts = () => {
  const {
    recommended_posts: posts,
    recommended_likes: likes,
    recommended_saved: saved,
    loading
  } = useSelector((store) => store.posts);
  return (
    <div style={{ marginTop: "2rem", width: "100%" }} className="post_container grid1">
      {loading && (
        <React.Fragment>
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
            likes={likes?.[i] || false}
            saved={saved?.[i] || false}
          />
        ))}
    </div>
  );
};

export default RecommendedPosts;
