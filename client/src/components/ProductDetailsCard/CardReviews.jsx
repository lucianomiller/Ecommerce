import React, { useState, useEffect } from "react";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import ReviewStars from "../ReviewStars/ReviewStars";
import Reviews from "../Reviews/Reviews";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import EditableUserReview from "../EditableUserReview/EditableUserReview";
import { hasBoughtProduct } from "../../api";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  collapseWrapper: {
    width: "100%"
  }
}));

function CardReviews({ reviewsData, productData, ...otherProps }) {
  const classes = useStyles();
  const [canLeaveAReview, setCanLeaveAReview] = useState(false);
  const { id, isLoggedIn } = useSelector((state) => state.users.userData);
  const [areReviewsExpanded, setAreReviewsExpanded] = React.useState(false);
  const thereAreReviews = reviewsData && reviewsData.length > 0;
  const userHasAlreadyLeftAReview =
    thereAreReviews && reviewsData.some((rev) => rev.authorId === id);

  const userReview =
    userHasAlreadyLeftAReview && reviewsData.find((rev) => rev.authorId === id);

  const handleExpandToggle = (e) => {
    e.stopPropagation();
    setAreReviewsExpanded(!areReviewsExpanded);
  };

  useEffect(() => {
    productData.id &&
      hasBoughtProduct(productData.id).then((resp) =>
        setCanLeaveAReview(resp.data)
      );
  }, [productData.id]);

  const avg =
    (thereAreReviews &&
      (
        reviewsData.reduce((acc, next) => acc + next.score, 0) /
        reviewsData.length
      ).toFixed(1)) ||
    0;

  return (
    <>
      <ButtonBase {...otherProps} component="div" onClick={handleExpandToggle}>
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
      <Collapse
        classes={{ wrapper: classes.collapseWrapper }}
        style={{ padding: 0, margin: 0 }}
        in={areReviewsExpanded}
        timeout="auto"
        unmountOnExit
      >
        <Divider />
        <Reviews
          reviews={reviewsData}
          userReviewSlot={
            canLeaveAReview &&
            isLoggedIn &&
            (!userHasAlreadyLeftAReview ? (
              <NewReviewForm productId={productData.id} />
            ) : (
              <>
                <EditableUserReview
                  reviewData={userReview}
                  productId={productData.id}
                />
                <Divider
                  style={{ width: "100%", marginBottom: 16, marginTop: 8 }}
                />
              </>
            ))
          }
          style={{ padding: 20 }}
        />
      </Collapse>
    </>
  );
}

export default CardReviews;
