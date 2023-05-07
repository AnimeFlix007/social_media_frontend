import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../../context/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function FollowingDrawer({ profile }) {
  const navigate = useNavigate();
  const { user: loggedInUser } = useSelector((store) => store.auth);
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "45vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        style={{
          fontSize: "1.63rem",
          padding: "5px 10px",
          width: "100%",
          //   color: "#4033ce",
          fontWeight: "600",
        }}
      >
        Following
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {profile?.following?.map((user) => {
          return (
            <ListItem
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
              secondaryAction={
                loggedInUser?.user?._id == profile._id && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(unfollowUser({ unfollowId: user._id }));
                    }}
                    color="error"
                    variant="contained"
                  >
                    UnFollow
                  </Button>
                )
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.fullname} secondary={user.role} />
                <ListItemText primary={user.followers.length} secondary="Followers" />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <li onClick={toggleDrawer(anchor, true)}>
            <span>{profile?.following?.length}</span>Following
          </li>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
