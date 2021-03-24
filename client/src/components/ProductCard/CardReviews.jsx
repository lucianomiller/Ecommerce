import React from "react";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReviewStars from "../ReviewStars/ReviewStars";
import Reviews from "../Reviews/Reviews";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  collapseWrapper: {
    width: "100%"
  }
}));

function CardReviews({ reviewsData }) {
  const classes = useStyles();
  const [areReviewsExpanded, setAreReviewsExpanded] = React.useState(false);
  const thereAreReviews = reviewsData && reviewsData.length > 0;

  const handleExpandToggle = (e) => {
    e.stopPropagation();
    setAreReviewsExpanded(!areReviewsExpanded);
  };

  const avg =
    thereAreReviews &&
    (
      reviewsData.reduce((acc, next) => acc + next.score, 0) /
      reviewsData.length
    ).toFixed(1);

  return (
    <>
      {thereAreReviews ? (
        <ButtonBase component="div" onClick={handleExpandToggle}>
          <ReviewStars
            score={avg}
            secondaryText={`${avg} (${reviewsData.length})`}
          />
          <ExpandMoreIcon
            style={{
              transition: "transform 300ms linear",
              transform: `rotate(${areReviewsExpanded ? "180deg" : "0"})`
            }}
          />
        </ButtonBase>
      ) : (
        <div>
          <ReviewStars reviewsArr={reviewsData} />
        </div>
      )}
      {thereAreReviews && (
        <Collapse
          classes={{ wrapper: classes.collapseWrapper }}
          style={{ padding: 0, margin: 0 }}
          in={areReviewsExpanded}
          timeout="auto"
          unmountOnExit
        >
          <Divider />
          <Reviews compact reviews={reviewsData} />
        </Collapse>
      )}
    </>
  );
}

export default CardReviews;
