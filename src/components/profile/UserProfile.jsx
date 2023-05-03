import React from "react";
import "../../styles/profile/profile.css";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../../context/slice/userSlice";
import FollowersDrawer from "./FollowersDrawer";
import FollowingDrawer from "./FollowingDrawer";

const UserProfile = ({ profile }) => {
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { images } = useSelector((store) => store.posts);

  const isFollowing = profile?.followers?.find((p) => p._id == user?.user?._id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateToEditProfileHandler = () => {
    navigate(`/edit-profile/${user?.user?._id}`);
  };

  function followUserHandler(id) {
    dispatch(followUser({ followId: id }));
  }
  function unfollowUserHandler(id) {
    dispatch(unfollowUser({ unfollowId: id }));
  }
  return (
    <div className="header__wrapper">
      <header>
        <img src={profile?.bg_image} alt="bg_image" />
      </header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={profile?.avatar} alt={profile?.username} />
            <span></span>
          </div>
          {profile?.fullname && <h2>{profile?.fullname}</h2>}
          <h3>@{profile?.username}</h3>
          <p>{profile?.role}</p>
          <p>{profile?.email}</p>

          <ul className="about">
            <FollowersDrawer profile={profile} />
            <FollowingDrawer profile={profile} />
            <li>
              <span>200,543</span>Attraction
            </li>
          </ul>
          <div className="content">
            <p>{profile?.story}</p>

            <ul>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </ul>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab value={1} label="Photos" />
              <Tab value={2} label="Posts" />
              <Tab value={3} label="Friends" />
            </Tabs>
            {profile._id === user?.user?._id ? (
              <button
                className="primary-btn"
                onClick={navigateToEditProfileHandler}
              >
                Edit
              </button>
            ) : isFollowing ? (
              <button
                onClick={() => unfollowUserHandler(profile._id)}
                className="danger-btn"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUserHandler(profile._id)}
                className="primary-btn"
              >
                Follow
              </button>
            )}
          </nav>

          <div className="photos">
            {images?.map((img) => (
              <img src={img} alt="Photo" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
