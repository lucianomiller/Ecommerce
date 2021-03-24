import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UserReview from "../UserReview/UserReview";
import EditReview from "./EditReview";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  fetchSpecificProductReviews,
  fetchAllReviews
} from "../../redux/actions/reviews";
import { getMostRecentlyCreatedProductsReviews } from "../../redux/actions/productsActions";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { deleteProductReview } from "../../api";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    color: theme.palette.error.main
  }
}));

function EditableUserReview({ reviewData, productId }) {
  const dispatch = useDispatch();
  const [isEditingReview, setIsEditingReview] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const classes = useStyles();

  const handleConfirmDelete = () => {
    deleteProductReview(productId, reviewData.id).then(() => {
      dispatch(fetchSpecificProductReviews(productId)).then(() => {
        dispatch(fetchAllReviews());
        dispatch(getMostRecentlyCreatedProductsReviews());
      });
    });
  };

  const onReviewEdit = () => {
    dispatch(fetchSpecificProductReviews(productId)).then(() => {
      dispatch(fetchAllReviews());
      dispatch(getMostRecentlyCreatedProductsReviews());
    });
  };

  return isEditingReview ? (
    <EditReview
      onEdit={onReviewEdit}
      onRequestCancel={() => setIsEditingReview(false)}
      score={reviewData.score}
      reviewId={reviewData.id}
      description={reviewData.content}
    />
  ) : (
    <>
      <ConfirmationModal
        isModalOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        title={"Estas seguro de que quieres eliminar esta reseña?"}
      />
      <div className={classes.wrapper}>
        <UserReview {...reviewData} date={reviewData.createdAt}>
          {reviewData.content}
        </UserReview>
        <div>
          <IconButton onClick={() => setIsEditingReview(true)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsDeleteModalOpen(true)}
            className={classes.deleteIcon}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default EditableUserReview;
