import {
  FETCHING_REVIEWS,
  FETCHED_REVIEWS,
  FETCHED_SPECIFIC_PRODUCT_REVIEWS,
  FETCHING_REVIEWS_ERROR,
  FETCHING_SPECIFIC_PRODUCT_REVIEWS,
  FETCHING_SPECIFIC_PRODUCT_REVIEWS_ERROR
} from "../constants/reviews";

const initialState = {
  allReviews: [],
  specificProductReviews: [],
  isFetchingAllReviews: false,
  isFetchingAllReviewsError: null,
  isFetchingSpecificProductReviews: false,
  isFetchingSpecificProductReviewsError: null
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_REVIEWS:
      return {
        ...state,
        allReviews: [],
        isFetchingAllReviews: true,
        isFetchingAllReviewsError: null
      };
    case FETCHED_REVIEWS:
      return {
        ...state,
        allReviews: action.payload,
        isFetchingAllReviews: false,
        isFetchingAllReviewsError: null
      };
    case FETCHING_REVIEWS_ERROR:
      return {
        ...state,
        isFetchingAllReviews: false,
        isFetchingAllReviewsError: action.payload
      };

    case FETCHING_SPECIFIC_PRODUCT_REVIEWS:
      return {
        ...state,
        specificProductReviews: [],
        isFetchingSpecificProductReviews: true,
        isFetchingSpecificProductReviewsError: null
      };
    case FETCHED_SPECIFIC_PRODUCT_REVIEWS:
      return {
        ...state,
        specificProductReviews: action.payload,
        isFetchingSpecificProductReviews: false,
        isFetchingSpecificProductReviewsError: null
      };
    case FETCHING_SPECIFIC_PRODUCT_REVIEWS_ERROR:
      return {
        ...state,
        isFetchingSpecificProductReviews: false,
        isFetchingSpecificProductReviewsError: action.payload
      };

    default:
      return state;
  }
};
