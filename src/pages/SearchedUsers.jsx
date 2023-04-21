import React, { useEffect, useState } from "react";
import "../styles/search/search-box.css";
import "../styles/search/search.css";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { SearchedUsers as getSearchedUsers } from "../context/slice/userSlice";
import { Avatar } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Loading from "../components/global/Loading";
import NoSearchedUsers from "../assets/NoSearchedUsers.avif";
import { useNavigate } from "react-router-dom";

const SearchedUsers = () => {
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
  return (
    <section className="main">
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
          {loading && <Loading />}
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
                <div className="" key={user._id}>
                  <ListItemButton onClick={() => navigateHandler(user._id)}>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsbPz_C8hONdPj8X3j43b8vec83fRqDLYkGQ8XyMnJjVjupU2GM7eD6RUnHL3MzWD-zCMe65TS10&usqp=CAU&ec=48600112"
                        }
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
      <div className="suggested-users"></div>
    </section>
  );
};

export default SearchedUsers;
