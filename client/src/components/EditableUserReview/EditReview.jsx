import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { useTheme } from "@material-ui/core/styles";
import { editProductReview } from "../../api";

function EditReview({ reviewId, description, score, onRequestCancel, onEdit }) {
  const theme = useTheme();
  const [reviewRating, setReviewRating] = React.useState(score);
  const [reviewText, setReviewText] = React.useState(description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewRating === 0) return alert("Puntuación de review invalida");
    editProductReview(reviewId, {
      score: reviewRating,
      description: reviewText
    }).then(() => {
      onEdit && onEdit();
    });
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            type="button"
            onClick={onRequestCancel}
            style={{
              color: theme.palette.error.main,
              marginLeft: "auto"
            }}
            variant="outlined"
            color="inherit"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            style={{
              display: "inline-block",
              marginLeft: "auto"
            }}
            variant="contained"
            color="primary"
          >
            Editar review
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditReview;
