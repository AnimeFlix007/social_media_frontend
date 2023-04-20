import React, { useState } from "react";
import "../../styles/global/Sidebar.css";
import Logo from "../../assets/FairyTailLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { togglemode } from "../../context/slice/modeSlice";
import { authLogout } from "../../context/slice/authSlice";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { darkMode } = useSelector((store) => store.mode);
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();
  return (
    <nav className={showSidebar ? "sidebar open" : "sidebar close"}>
      <header>
        <div className="image-text">
          <span className="image">
            <img className={showSidebar ? "open" : ""} src={Logo} alt="Logo" />
          </span>
        </div>

        <i
          onClick={() => setShowSidebar((prev) => !prev)}
          className="bx bx-chevron-right toggle"
        ></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Home</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bar-chart-alt-2 icon"></i>
                <span className="text nav-text">Discover</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-heart icon"></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Profile</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li onClick={() => dispatch(authLogout())} className="">
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Logout</span>
          </li>

          <li className="mode">
            <div className="sun-moon">
              {darkMode ? (
                <i className="bx bx-moon icon moon"></i>
              ) : (
                <i className="bx bx-sun icon sun"></i>
              )}
            </div>
            <span className="mode-text text">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>

            <div
              onClick={() => dispatch(togglemode())}
              className="toggle-switch"
            >
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
