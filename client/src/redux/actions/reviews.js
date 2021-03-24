import {
  FETCHING_REVIEWS,
  FETCHED_REVIEWS,
  FETCHED_SPECIFIC_PRODUCT_REVIEWS,
  FETCHING_REVIEWS_ERROR,
  FETCHING_SPECIFIC_PRODUCT_REVIEWS,
  FETCHING_SPECIFIC_PRODUCT_REVIEWS_ERROR
} from "../constants/reviews";

import { getAllReviews, getProductReviews } from "../../api";

export const fetchAllReviews = () => (dispatch) => {
  dispatch({ type: FETCHING_REVIEWS });
  return getAllReviews()
    .then((resp) => {
      dispatch({ type: FETCHED_REVIEWS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_REVIEWS_ERROR, payload: e });
    });
};

export const fetchSpecificProductReviews = (productId) => (dispatch) => {
  dispatch({ type: FETCHING_SPECIFIC_PRODUCT_REVIEWS });
  return getProductReviews(productId)
    .then((resp) => {
      dispatch({ type: FETCHED_SPECIFIC_PRODUCT_REVIEWS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_SPECIFIC_PRODUCT_REVIEWS_ERROR, payload: e });
    });
};
