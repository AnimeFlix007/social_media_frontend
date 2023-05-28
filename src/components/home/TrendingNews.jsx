import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";

export default function TrendingNews({ news }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {news?.map((news) => {
        return (
          <ListItemButton
            href={news.url}
            target="_blank"
            rel="noopener"
            alignItems="flex-start"
            key={news.publishedAt}
          >
            <ListItemAvatar>
              <Avatar alt={news.source.name} src={news.urlToImage} />
            </ListItemAvatar>
            <ListItemText
              // primary={news.source.name}
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {news.author || "Anonymous"}
                  </Typography>
                  — {news.title}
                </React.Fragment>
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
