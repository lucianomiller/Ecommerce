import React from "react";
import FavoriteIconOutlined from "@material-ui/icons/FavoriteBorder";
import FavoriteIconFilled from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  favicon: {
    color: "red"
  }
}));

function FavoriteIcon({ onClick, isFavorited = false }) {
  const classes = useStyles();
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <IconButton
      onClick={(e) => {
        handleClick(e);
        onClick && onClick(e);
      }}
      className={classes.favicon}
    >
      {isFavorited ? (
        <FavoriteIconFilled color="inherit" />
      ) : (
        <FavoriteIconOutlined color="inherit" />
      )}
    </IconButton>
  );
}

export default FavoriteIcon;
