import React from "react";
import { useTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

// dumb component
function Review({ score, secondaryText, starsSize, style, ...otherProps }) {
  const theme = useTheme();

  return (
    <div
      {...otherProps}
      style={{
        color: "#FED42C",
        display: "flex",
        padding: 0,
        margin: 0,
        ...style
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Rating
          size={starsSize}
          readOnly
          style={{ color: "#FED42C" }}
          precision={0.5}
          value={score}
        />
        {secondaryText && (
          <Typography
            variant="body2"
            style={{ marginLeft: 10, color: theme.palette.text.secondary }}
          >
            {secondaryText}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Review;
