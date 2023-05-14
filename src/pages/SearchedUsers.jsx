import React, { useEffect, useState } from "react";
import "../styles/search/search-box.css";
import "../styles/search/search.css";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { SearchedUsers as getSearchedUsers } from "../context/slice/userSlice";
import { Avatar, useMediaQuery } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import NoSearchedUsers from "../assets/NoSearchedUsers.avif";
import { useNavigate } from "react-router-dom";
import Loader from "../components/global/Loader";

const SearchedUsers = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((store) => store.users);
  const [searchedUsers, setSearchedUsers] = useState("");
  const onChangeHandler = (e) => {
    setSearchedUsers(e.target.value);
  };
  const [debouncedValue] = useDebounce(searchedUsers, 1000);
  useEffect(() => {
    if (debouncedValue) {
      dispatch(getSearchedUsers({ username: searchedUsers }));
    }
  }, [debouncedValue, dispatch]);
  function navigateHandler(id) {
    navigate(`/profile/${id}`);
  }

  const mediaQuery = useMediaQuery("(max-width:420px)");

  return (
    <section
      style={
        mediaQuery
          ? { position: "static", width: "100%", padding: "2rem .25rem" }
          : { position: "static", width: "100%" }
      }
      className="main"
    >
      <div className="search-component">
        <div className="search-box">
          <i className="bx bx-search-alt"></i>
          <input
            type="text"
            name="search-users"
            id="search-users"
            placeholder="Search People"
            value={searchedUsers}
            onChange={onChangeHandler}
          />
        </div>
        <div className="searched-users">
          {loading && <Loader />}
          {!loading && users?.length === 0 && (
            <div className="no-searched-users">
              <img src={NoSearchedUsers} alt="NoSearchedUsers" />
              {searchedUsers?.length === 0 ? (
                <p style={{ fontSize: "20px" }} className="text">
                  Search People Around You...
                </p>
              ) : (
                <p style={{ fontSize: "20px" }} className="text">
                  No Search Results Found
                </p>
              )}
            </div>
          )}
          {!loading &&
            users &&
            users?.map((user) => {
              return (
                <div
                  onClick={toggleDrawer("right", false)}
                  className=""
                  key={user._id}
                >
                  <ListItemButton onClick={() => navigateHandler(user._id)}>
                    <ListItemAvatar>
                      <Avatar
                        src={user?.avatar}
                        alt={user?.username}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.fullname}
                      secondary={"@" + user?.username}
                    />
                  </ListItemButton>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default SearchedUsers;
