import React, { useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { followUser, suggestedUsers } from "../../context/slice/userSlice";
import { ExplorePosts } from "../../context/slice/postSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const SuggestedUser = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <ListItem
      sx={{ px: 0 }}
      key={user._id}
      onClick={() => navigate(`/profile/${user._id}`)}
      secondaryAction={
        !loading ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setLoading(true);
              dispatch(followUser({ followId: user._id }))
                .then(unwrapResult)
                .then(() => {
                  return dispatch(ExplorePosts());
                })
                .then(() => {
                  return dispatch(suggestedUsers({ num: 4 }));
                })
                .then(() => {
                  setLoading(false);
                });
            }}
            color="primary"
            variant="contained"
          >
            Follow
          </Button>
        ) : (
          <Button color="primary" variant="contained">
            <CircularProgress style={{ color: "white" }} size={"1rem"} />
          </Button>
        )
      }
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.avatar} />
        </ListItemAvatar>
        <ListItemText primary={user.fullname} secondary={user.role} />
      </ListItemButton>
    </ListItem>
  );
};

export default SuggestedUser;
