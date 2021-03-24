import React from "react";
import Typography from "@material-ui/core/Typography";
import ReviewStars from "../ReviewStars/ReviewStars";

const getFormattedDate = (date) => {
  const newDate = new Date(date);
  const today = new Date();

  // To calculate the time difference of two dates
  const Difference_In_Time = today.getTime() - newDate.getTime();

  // To calculate the no. of days between two dates
  const differenceInDays = Difference_In_Time / (1000 * 3600 * 24);

  if (differenceInDays < 1) {
    const horasDiff = Math.abs(today.getHours() - newDate.getHours());
    if (horasDiff < 1) {
      return `Hace ${Math.abs(
        today.getMinutes() - newDate.getMinutes()
      )} minutos`;
    } else {
      return `Hace ${horasDiff} hora${horasDiff > 1 ? "s" : ""}`;
    }
  }

  const dateAsString = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
  const dateDifference = Math.ceil((today - newDate) / 8.64e7);
  return differenceInDays < 31 ? `Hace ${dateDifference} días` : dateAsString;
};

function UserReview({ author, score, date, children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <Typography variant="h6">{author}</Typography>
      <ReviewStars
        starsSize="small"
        score={score}
        style={{ marginBottom: 15, marginTop: 3, marginLeft: -2 }}
        secondaryText={date && getFormattedDate(date)}
      />
      <Typography>{children}</Typography>
    </div>
  );
}

export default UserReview;
