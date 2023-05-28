import React from "react";
import "../../styles/global/bottomnavigation.css";
import { Link, useLocation } from "react-router-dom";
import SearchDrawer from "./SearchDrawer";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";
import { useSelector } from "react-redux";

const BottomNavigation = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.auth);
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, right: open });
  };
  return (
    <div className="navigation">
      <ul>
        <li className={pathname === "/" ? "active" : ""}>
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
              <i className="bx bx-search"></i>
            </span>
            <span className="text">Search</span>
          </a>
        </li>
        <li className={pathname === "/discover" ? "active" : ""}>
          <Link to="/discover">
            <span className="icon">
              <i className="bx bx-compass"></i>
            </span>
            <span className="text">Explore</span>
          </Link>
        </li>
        <li>
          <Link
            onClick={() =>
              toast.info(
                "Currently we are working on the message section",
                options
              )
            }
            to="#"
          >
            <span className="icon">
              <i className="bx bx-message-square"></i>
            </span>
            <span className="text">Message</span>
          </Link>
        </li>
        <li
          className={pathname === "/profile/" + user?.user?._id ? "active" : ""}
        >
          <Link to={"/profile/" + user?.user?._id}>
            <span className="icon">
              <i className="bx bx-user"></i>
            </span>
            <span className="text">Profile</span>
          </Link>
        </li>
        <div className="indicator"></div>
        <SearchDrawer state={state} toggleDrawer={toggleDrawer} />
      </ul>
    </div>
  );
};

export default BottomNavigation;
