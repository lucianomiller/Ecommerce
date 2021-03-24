import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { postReview } from "../../api";
import { useDispatch } from "react-redux";
import {
  fetchSpecificProductReviews,
  fetchAllReviews
} from "../../redux/actions/reviews";
import { getMostRecentlyCreatedProductsReviews } from "../../redux/actions/productsActions";

function NewReview({ productId }) {
  const dispatch = useDispatch();
  const [reviewRating, setReviewRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewRating === 0) return alert("Puntuación de review invalida");
    postReview(productId, {
      score: reviewRating,
      description: reviewText
    })
      .then(() => {
        dispatch(fetchSpecificProductReviews(productId));
        dispatch(getMostRecentlyCreatedProductsReviews());
      })
      .then(() => dispatch(fetchAllReviews()));
  };

  return (
    <form
      style={{
        width: "100%",
        marginBottom: 25,
        display: "flex",
        flexDirection: "column"
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        style={{ marginBottom: 15, width: "100%" }}
        multiline
        variant="filled"
        placeholder="Tu review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Rating
          value={reviewRating}
          style={{ color: "#FED42C" }}
          precision={0.5}
          onChange={(event, newValue) => {
            setReviewRating(newValue);
          }}
        />
        <Button
          type="submit"
          style={{
            display: "inline-block",
            marginLeft: "auto"
          }}
          variant="contained"
          color="primary"
        >
          Dejar review
        </Button>
      </div>
    </form>
  );
}

export default NewReview;
