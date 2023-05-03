import React from "react";
import "../../styles/post/singlepost.css"

const SinglePost = () => {
  return (
    <div className="card">
      <div className="top">
        <div className="user-details">
          <div className="user-profile_img">
            <img src="https://studiojakemedia.files.wordpress.com/2019/11/erza-scarlet-fairy-tail.png?w=723&h=404" alt="" className="cover" />
          </div>
          <h3>
            Devjit Bose <br /> <span>Jharkhand, India</span>
          </h3>
        </div>
        <div>
          <i className="bx bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <div className="imageBx">
        <img
          src="https://img.etimg.com/thumb/width-640,height-480,imgsize-67262,resizemode-1,msid-92073673/magazines/panache/after-25-years-beloved-japanese-manga-one-piece-heads-into-final-chapter/one-piece.jpg"
          alt="OnePiece"
        />
      </div>
      <div className="action-btns">
        <div className="left">
          <i class="bx bx-heart"></i>
          {false && <i class="bx bxs-heart"></i>}
          <i class="bx bxs-chat"></i>
          <i class="bx bx-share-alt"></i>
        </div>
        <div className="right">
          <i class="bx bx-bookmark"></i>
        </div>
      </div>
      <h4 className="likes">3,657 Likes</h4>
      <h4 className="message">
        <b>Devjit Bose</b> One Piece is a great show <span>#onepiece</span>
        <span>#anime</span>
      </h4>
      <h4 className="comments">View all 342 comments</h4>
      <div className="add-comment">
        <div className="user-img">
            <img src="https://studiojakemedia.files.wordpress.com/2019/11/erza-scarlet-fairy-tail.png?w=723&h=404" alt="" />
        </div>
        <input type="text" placeholder="Add a comment" />
      </div>
      <h5>4 hours ago</h5>
    </div>
  );
};

export default SinglePost;
