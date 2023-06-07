import React, { useState } from "react";
import "../../styles/global/Sidebar.css";
import Logo from "../../assets/FairyTailLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { togglemode } from "../../context/slice/modeSlice";
import { authLogout } from "../../context/slice/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchDrawer from "./SearchDrawer";
import { unwrapResult } from "@reduxjs/toolkit";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode } = useSelector((store) => store.mode);
  const { user } = useSelector((store) => store.auth);

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, right: open });
  };

  const logouthandler = () => {
    dispatch(authLogout())
      .then(unwrapResult)
      .then(() => {
        navigate("/");
      });
  };

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
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/" className={pathname === "/" ? "active" : ""}>
                <i
                  className={
                    pathname === "/"
                      ? "bx bx-home-alt icon active"
                      : "bx bx-home-alt icon"
                  }
                ></i>
                <span
                  className={
                    pathname === "/" ? "text nav-text active" : "text nav-text"
                  }
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="nav-link">
              <a
                onClick={toggleDrawer("right", true)}
                href="#"
                className={pathname === "/search" ? "active" : ""}
              >
                <i
                  className={
                    pathname === "/search"
                      ? "bx bx-search icon active"
                      : "bx bx-search icon"
                  }
                ></i>
                <span
                  className={
                    pathname === "/search"
                      ? "text nav-text active"
                      : "text nav-text"
                  }
                >
                  Search
                </span>
              </a>
            </li>

            <SearchDrawer state={state} toggleDrawer={toggleDrawer} />

            <li className="nav-link">
              <Link
                to="/discover"
                className={pathname === "/discover" ? "active" : ""}
              >
                <i
                  className={
                    pathname === "/discover"
                      ? "bx bx-bar-chart-alt-2 icon active"
                      : "bx bx-bar-chart-alt-2 icon"
                  }
                ></i>
                <span
                  className={
                    pathname === "/discover"
                      ? "text nav-text active"
                      : "text nav-text"
                  }
                >
                  Discover
                </span>
              </Link>
            </li>

            <li className="nav-link">
              <Link
                to={"/profile/" + user?.user?._id}
                className={
                  pathname === "/profile/" + user?.user?._id ? "active" : ""
                }
              >
                <i
                  className={
                    pathname === "/profile/" + user?.user?._id
                      ? "bx bx-user icon active"
                      : "bx bx-user icon"
                  }
                ></i>
                <span
                  className={
                    pathname === "/profile/" + user?.user?._id
                      ? "text nav-text active"
                      : "text nav-text"
                  }
                >
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li onClick={logouthandler} className="logout">
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
