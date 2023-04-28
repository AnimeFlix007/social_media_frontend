import React from "react";
import "../../styles/profile/profile.css";
import { Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ profile }) => {
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateToEditProfileHandler = () => {
    navigate(`/edit-profile/${user?.user?._id}`);
  };
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
            <li>
              <span>{profile?.followers?.length}</span>Followers
            </li>
            <li>
              <span>{profile?.following?.length}</span>Following
            </li>
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
              <button onClick={navigateToEditProfileHandler}>Edit</button>
            ) : (
              <button>Follow</button>
            )}
          </nav>

          <div className="photos">
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
            <img
              src="https://m.media-amazon.com/images/I/71iTBfKZR4L._RI_.jpg"
              alt="Photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
