import axios from "axios";
import {
  GET_PRODUCT_BY_CATEGORIES,
  CREATING_PRODUCT,
  CREATED_PRODUCT,
  CREATING_PRODUCT_ERROR,
  FETCHED_PRODUCTS,
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_ERROR,
  DELETED_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  MODIFIED_PRODUCT,
  MODIFYING_PRODUCT,
  MODIFYING_PRODUCT_ERROR,
  FETCHING_LATEST_PRODUCTS_REVIEWS,
  FETCHED_LATEST_PRODUCTS_REVIEWS,
  FETCHING_LATEST_PRODUCTS_REVIEWS_ERROR
} from "../constants/products";
import {
  getProducts,
  getByCategory,
  postProduct,
  putProduct,
  deleteProduct,
  getNewestProducts
} from "../../api";

export const getProductByCategories = (categorie) => {
  return function (dispatch) {
    getByCategory(categorie).then((resp) => {
      dispatch({ type: GET_PRODUCT_BY_CATEGORIES, payload: resp.data });
    });
  };
};

export const getMostRecentlyCreatedProductsReviews = () => (dispatch) => {
  dispatch({ type: FETCHING_LATEST_PRODUCTS_REVIEWS });
  getNewestProducts(12)
    .then(({ data }) => {
      dispatch({
        type: FETCHED_LATEST_PRODUCTS_REVIEWS,
        payload: data.map((prod) => prod.reviews)
      });
    })
    .catch((resp) =>
      dispatch({ type: FETCHING_LATEST_PRODUCTS_REVIEWS_ERROR, payload: resp })
    );
};

export const createProduct = (data) => (dispatch) => {
  dispatch({ type: CREATING_PRODUCT });
  postProduct(data)
    .then((resp) => {
      console.log(resp);
      dispatch({ type: CREATED_PRODUCT, payload: resp });
      dispatch(fetchProducts());
    })
    .catch((e) => {
      dispatch({ type: CREATING_PRODUCT_ERROR, payload: e });
    });
};

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: FETCHING_PRODUCTS });

  getProducts()
    .then((resp) => {
      dispatch({ type: FETCHED_PRODUCTS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_PRODUCTS_ERROR, payload: e });
    });
};

export const removeProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT });
  deleteProduct(id)
    .then((resp) => {
      dispatch({ type: DELETED_PRODUCT, payload: resp.data });
      dispatch(fetchProducts());
    })
    .catch((e) => {
      dispatch({ type: DELETE_PRODUCT_ERROR, payload: e });
    });
};

export const modifyProduct = (data) => (dispatch) => {
  dispatch({ type: MODIFYING_PRODUCT });

  putProduct(data)
    .then(() => {
      data.categories.forEach((cat) => {
        if (cat.isSelected) {
          axios.post(
            `http://localhost:3001/products/${data.id}/category/${cat.id}`
          );
        } else {
          axios.delete(
            `http://localhost:3001/products/${data.id}/category/${cat.id}`
          );
        }
      });
    })
    .then(() => {
      dispatch({ type: MODIFIED_PRODUCT });
      dispatch(fetchProducts());
    })
    .catch((e) => {
      dispatch({ type: MODIFYING_PRODUCT_ERROR, payload: e });
    });
};
