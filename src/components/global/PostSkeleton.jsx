import React from "react";
import "../../styles/global/skeleton.css";

const PostSkeleton = () => {
  return (
    <div className="card">
      <div className="top">
        <div className="user-details">
          <div className="user-profile_img">
            <img className="skeleton cover" />
          </div>
          <h3
            className="skeleton skeleton-text"
            style={{ width: "100px" }}
          ></h3>
        </div>
        <div className="dot">
          <i className="bx bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <div className="imageBx">
        <img alt={""} className="skeleton cover" />
      </div>
      <h4 style={{ width: "50px" }} className="skeleton likes"></h4>
      <h4 className="skeleton skeleton-text message" style={{ width: "100%", height: "20px" }}>
        
      </h4>
      <div className="add-comment">
        <div className="user-img">
          <img className="skeleton cover" alt="" />
        </div>
        <input
          className="skeleton skeleton-footer input-text"
          type="text"
        />
      </div>
      <h5 className="skeleton skeleton-text post-time" style={{ width: "150px" }}></h5>
    </div>
  );
};

export default PostSkeleton;
