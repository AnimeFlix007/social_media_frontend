import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "../../styles/home/post.css";

const CreatePost = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="create-post-container">
      <div>
        <Avatar src={user?.user?.avatar} />
        <textarea
          type="text"
          placeholder={
            "Something on your Mind, " + user?.user?.fullname ||
            user?.user?.username
          }
        />
      </div>
      <div>
        <i className="bx bx-camera post-icons"></i>
        <i className="bx bxs-video post-icons"></i>
        <i className="post-icons">&#128516;</i>
      </div>
    </div>
  );
};

export default CreatePost;
