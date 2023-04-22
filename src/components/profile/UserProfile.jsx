import React from "react";
import "../../styles/profile/profile.css";
import { Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = ({ profile }) => {
  const [value, setValue] = React.useState(1);
  const { user } = useSelector((store) => store.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="header__wrapper">
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img
              src={profile?.avatar}
              alt={profile?.username}
            />
            <span></span>
          </div>
          <h2>{profile?.username}</h2>
          <p>UX/UI Designer</p>
          <p>{profile?.email}</p>

          <ul className="about">
            <li>
              <span>4,073</span>Followers
            </li>
            <li>
              <span>322</span>Following
            </li>
            <li>
              <span>200,543</span>Attraction
            </li>
          </ul>

          <div className="content">
            <p>
              {profile?.story}
            </p>

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
              <button>Edit</button>
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
