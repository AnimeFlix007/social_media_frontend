import React from "react";
import "../../styles/global/bottomnavigation.css";
import { Link } from "react-router-dom";
import SearchDrawer from "./SearchDrawer";

const BottomNavigation = () => {
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, right: open });
  };
  return (
    <div className="navigation">
      <ul>
        <li className="active">
          <Link to="/">
            <span className="icon">
              <i className="bx bx-home"></i>
            </span>
            <span className="text">Home</span>
          </Link>
        </li>
        <li>
          <a onClick={toggleDrawer("right", true)} href="#">
            <span className="icon">
              <i class="bx bx-search"></i>
            </span>
            <span className="text">Search</span>
          </a>
        </li>
        <SearchDrawer state={state} toggleDrawer={toggleDrawer} />
        <li>
          <a href="#">
            <span className="icon">
              <i class="bx bx-compass"></i>
            </span>
            <span className="text">Explore</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i class="bx bx-message-square"></i>
            </span>
            <span className="text">Message</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i class="bx bx-user"></i>
            </span>
            <span className="text">Profile</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default BottomNavigation;
