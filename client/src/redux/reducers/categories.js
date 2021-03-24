import {
  CREATING_CATEGORY,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  FETCHED_CATEGORIES,
  FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_ERROR
} from "../constants/categories";

const initialState = {
  categories: [],
  isFetchingCategories: false,
  isFetchingCategoriesError: null,
  isCreatingCategory: false,
  isCreatingCategoryError: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATING_CATEGORY:
      return {
        ...state,
        isCreatingCategory: true,
        isCreatingCategoryError: null
      };
    case CREATED_CATEGORY:
      return {
        ...state,
        isCreatingCategory: false,
        isCreatingCategoryError: null
      };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        isCreatingCategory: false,
        isCreatingCategoryError: action.payload
      };

    case FETCHING_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: true,
        isFetchingCategoriesError: null
      };
    case FETCHED_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        isFetchingCategories: false,
        isFetchingCategoriesError: null
      };
    case FETCHING_CATEGORIES_ERROR:
      return {
        ...state,
        isFetchingCategories: false,
        isFetchingCategoriesError: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
