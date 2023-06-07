import { Avatar, Button, CircularProgress, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home/post.css";
import { Create_Post, ExplorePosts } from "../../context/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const CreatePost = () => {
  const { user } = useSelector((store) => store.auth);
  const { creating: loading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const content = useRef();
  function onChangeImageHandler(e) {
    setImages((prev) => [...prev, ...e.target.files]);
  }
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const createPostHandler = async () => {
    if (content.current.value.length === 0) {
      toast.warn("Please write something about your post !!", options);
    }
    const filePathsPromises = [];
    images.forEach((file) => {
      filePathsPromises.push(toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    dispatch(Create_Post({ content: content.current.value, images: filePaths }))
      .then(unwrapResult)
      .then(() => {
        setImages([]);
        dispatch(ExplorePosts());
        content.current.value = "";
      });
  };
  function deleteImage(file_x) {
    setImages((prev) => prev.filter((file) => file.name !== file_x.name));
  }
  return (
    <div className="create-post-container">
      <div>
        <Avatar src={user?.user?.avatar} />
        <textarea
          type="text"
          placeholder={
            "Something on your Mind, " +
            (user?.user?.fullname || user?.user?.username)
          }
          ref={content}
        />
      </div>
      <div className="preview-box">
        {Array.from(images).map((file) => {
          return (
            <span key={file.name + Date.now()} style={{ position: "relative" }}>
              <img src={file ? URL.createObjectURL(file) : null} alt="post" />
              <Tooltip>
                <i
                  className="bx bx-message-x"
                  onClick={() => deleteImage(file)}
                  style={{
                    position: "absolute",
                    top: "0%",
                    right: "0%",
                    cursor: "pointer",
                  }}
                ></i>
              </Tooltip>
            </span>
          );
        })}
      </div>
      <div>
        <div>
          <Button
            variant="outlined"
            startIcon={<i className="bx bx-camera post-icons"></i>}
          >
            <label style={{ cursor: "pointer" }} htmlFor="select-images">
              Upload Images
            </label>
          </Button>
          <input
            id="select-images"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            type="file"
            onChange={onChangeImageHandler}
          />
        </div>
        {!loading ? (
          <button onClick={createPostHandler} className="primary-btn">
            Post
          </button>
        ) : (
          <button className="primary-btn">
            <CircularProgress style={{ color: "white" }} size={"1rem"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
