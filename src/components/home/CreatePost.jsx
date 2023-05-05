import { Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home/post.css";
import { Create_Post } from "../../context/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const CreatePost = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const content = useRef();
  function onChangeImageHandler(e) {
    setImages(prev => [...prev, ...e.target.files]);
  }
  const createPostHandler = () => {
    dispatch(Create_Post({ content: content.current.value, images }))
      .then(unwrapResult)
      .then(() => {
        setImages([]);
        content.current.value = "";
      });
  };
  return (
    <div className="create-post-container">
      <div>
        <Avatar src={user?.user?.avatar} />
        <textarea
          type="text"
          placeholder={
            "Something on your Mind, " + (user?.user?.fullname || user?.user?.username)
          }
          ref={content}
        />
      </div>
      <div className="preview-box">
        {Array.from(images).map((file) => {
          return (
            <span key={file.name + Date.now()}>
              <img
                src={file ? URL.createObjectURL(file) : null}
                alt="post"
              />
            </span>
          );
        })}
      </div>
      <div>
        <div>
          <label htmlFor="select-images">
            <i className="bx bx-camera post-icons"></i>
          </label>
          <input
            id="select-images"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            type="file"
            onChange={onChangeImageHandler}
          />
          <i className="bx bxs-video post-icons"></i>
          <i className="post-icons">&#128516;</i>
        </div>
        <button onClick={createPostHandler} className="primary-btn">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
