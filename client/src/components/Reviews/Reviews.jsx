import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserReview from "../UserReview/UserReview";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 10,
    color: theme.palette.text.secondary
  },
  container: {
    cursor: "default",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  compactReviews: {
    overflow: "auto",
    maxHeight: 350
  },
  reviewsList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& li + li": {
      marginTop: 15
    }
  }
}));

function Reviews({ reviews, compact, userReviewSlot, ...otherProps }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();

  return (
    <div
      className={`${classes.container} ${
        compact && matches && classes.compactReviews
      }`}
      {...otherProps}
      onClick={(e) => e.stopPropagation()}
    >
      {userReviewSlot}
      <Typography className={classes.header} variant="subtitle1">
        Reviews ({reviews ? reviews.length : 0})
      </Typography>
      {reviews && (
        <ul className={classes.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <UserReview
                author={review.author}
                score={review.score}
                date={review.createdAt}
              >
                {review.content}
              </UserReview>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
