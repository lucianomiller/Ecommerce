import {
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CREATING_CATEGORY,
  FETCHED_CATEGORIES,
  FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_ERROR,
  DELETED_CATEGORY,
  DELETING_CATEGORY,
  DELETING_CATEGORY_ERROR,
  MODIFIED_CATEGORY,
  MODIFYING_CATEGORY,
  MODIFYING_CATEGORY_ERROR
} from "../constants/categories";
import {
  getCategories,
  deleteCategory,
  putCategory,
  postCategory
} from "../../api";

export const createCategory = (category) => {
  return function (dispatch) {
    dispatch({ type: CREATING_CATEGORY });
    postCategory(category)
      .then((resp) => {
        dispatch({ type: CREATED_CATEGORY, payload: resp });
        dispatch(fetchCategories());
      })
      .catch((e) => {
        dispatch({ type: CREATED_CATEGORY_ERROR, payload: e });
      });
  };
};

export const fetchCategories = () => (dispatch) => {
  dispatch({ type: FETCHING_CATEGORIES });

  getCategories()
    .then((resp) => {
      dispatch({ type: FETCHED_CATEGORIES, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_CATEGORIES_ERROR, payload: e });
    });
};

export const removeCategory = (id) => (dispatch) => {
  dispatch({ type: DELETING_CATEGORY });

  deleteCategory(id)
    .then((resp) => {
      dispatch({ type: DELETED_CATEGORY, payload: resp.data });
      dispatch(fetchCategories());
    })
    .catch((e) => {
      dispatch({ type: DELETING_CATEGORY_ERROR, payload: e });
    });
};

export const modifyCategory = (data) => (dispatch) => {
  dispatch({ type: MODIFYING_CATEGORY });
  putCategory(data)
    .then((resp) => {
      dispatch({ type: MODIFIED_CATEGORY, payload: resp.data });
      dispatch(fetchCategories());
    })
    .catch((e) => {
      dispatch({ type: MODIFYING_CATEGORY_ERROR, payload: e });
    });
};
