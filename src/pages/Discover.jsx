import React, { useEffect, useState } from "react";
import "../styles/post/posts.css";
import SinglePost from "../components/posts/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../context/slice/postSlice";
import PostSkeleton from "../components/global/PostSkeleton";
import { Button } from "@mui/material";

const Discover = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, loading, likes, saved, results } = useSelector(
    (store) => store.posts
  );

  useEffect(() => {
    dispatch(Posts({ page }));
  }, [page]);

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
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: "4.5rem"
        }}
      >
        <Button
          disabled={page === 1 ? true : false}
          onClick={() => setPage((prev) => prev - 1)}
          variant="outlined"
        >
          Prev
        </Button>
        <Button
          sx={{ ml: 2 }}
          onClick={() => setPage((prev) => prev + 1)}
          variant="contained"
          disabled={Math.ceil(results / 16) === page}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Discover;
