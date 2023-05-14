import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SearchedUsers from "../../pages/SearchedUsers";
import { useMediaQuery } from "@mui/material";

export default function SearchDrawer({ state, toggleDrawer }) {
  const mediaQuery1 = useMediaQuery("(min-width:1150px)");
  const mediaQuery2 = useMediaQuery("(min-width:730px)");
  const list = (anchor) => (
    <Box
      sx={
        mediaQuery1
          ? { width: "30vw" }
          : mediaQuery2
          ? { width: "55vw" }
          : { width: "80vw" }
      }
      role="presentation"
    >
      <SearchedUsers toggleDrawer={toggleDrawer} />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
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
