import {
  GET_PRODUCT_BY_CATEGORIES,
  CREATED_PRODUCT,
  CREATING_PRODUCT,
  CREATING_PRODUCT_ERROR,
  FETCHED_PRODUCTS,
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_ERROR,
  FETCHING_LATEST_PRODUCTS_REVIEWS,
  FETCHED_LATEST_PRODUCTS_REVIEWS,
  FETCHING_LATEST_PRODUCTS_REVIEWS_ERROR
} from "../constants/products";

const initialState = {
  products: [],
  latestProductsReviews: [],
  isCreatingProduct: false,
  isCreatingProductError: null,
  isFetchingProducts: false,
  isFetchingProductsError: null,
  isFetchingLatestProductReviews: false,
  isFetchingLatestProductReviewsError: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LATEST_PRODUCTS_REVIEWS:
      return {
        ...state,
        latestProductsReviews: [],
        isFetchingLatestProductReviews: true,
        isFetchingLatestProductReviewsError: null
      };
    case FETCHED_LATEST_PRODUCTS_REVIEWS:
      return {
        ...state,
        latestProductsReviews: action.payload,
        isFetchingLatestProductReviews: false,
        isFetchingLatestProductReviewsError: null
      };
    case FETCHING_LATEST_PRODUCTS_REVIEWS_ERROR:
      return {
        ...state,
        latestProductsReviews: [],
        isFetchingLatestProductReviews: false,
        isFetchingLatestProductReviewsError: action.payload
      };
    case GET_PRODUCT_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload
      };
    case CREATING_PRODUCT:
      return {
        ...state,
        isCreatingProduct: true,
        isCreatingProductError: null
      };
    case CREATED_PRODUCT:
      return {
        ...state,
        isCreatingProduct: false,
        isCreatingProductError: null
      };
    case CREATING_PRODUCT_ERROR:
      return {
        ...state,
        isCreatingProduct: false,
        isCreatingProductError: action.payload
      };
    case FETCHING_PRODUCTS:
      return {
        ...state,
        isFetchingProducts: true,
        isFetchingProductsError: null
      };
    case FETCHED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isFetchingProducts: false,
        isFetchingProductsError: null
      };
    case FETCHING_PRODUCTS_ERROR:
      return {
        ...state,
        isFetchingProducts: false,
        isFetchingProductsError: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
