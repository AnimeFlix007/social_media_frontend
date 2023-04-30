import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FollowersDrawer({ profile }) {
    const navigate = useNavigate()
  const [state, setState] = React.useState({
    right: false,
  });

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
          fontWeight: "600",
        }}
      >
        Followers
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {profile?.followers?.map((user) => {
          return (
            <ListItem
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
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
            <span>{profile?.followers?.length}</span>Followers
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
