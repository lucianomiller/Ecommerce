import {
  CREATED_USER,
  CREATING_USER,
  CREATING_USER_ERROR,
  FETCHED_USERS,
  FETCHING_USERS,
  FETCHING_USERS_ERROR,
  LOGGED_USER_IN,
  LOGGING_USER,
  LOGGING_USER_ERROR,
  FETCHED_USER_DATA,
  FETCHING_USER_DATA,
  FETCHING_USER_DATA_ERROR,
  LOGOUT_USER
} from "../constants/user";

const initialState = {
  users: [],
  userData: { isLoggedIn: false },
  isCreatingUser: false,
  isCreatingUserError: null,
  isFetchingUsers: false,
  isFetchingUsersError: null,
  isLoggingInUser: false,
  isLoggingInUserError: null,
  isFetchingUserData: false,
  isFetchingUserDataError: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_DATA:
      return {
        ...state,
        isFetchingUserData: true,
        isFetchingUserDataError: null,
        userData: { isLoggedIn: false }
      };
    case FETCHED_USER_DATA:
      return {
        ...state,
        isFetchingUserData: false,
        isFetchingUserDataError: null,
        userData: { isLoggedIn: true, ...action.payload }
      };
    case FETCHING_USER_DATA_ERROR:
      return {
        ...state,
        isFetchingUserData: false,
        isFetchingUserDataError: action.payload,
        userData: { isLoggedIn: false }
      };
    case LOGGING_USER: {
      return {
        ...state,
        isLoggingInUser: true,
        isLoggingInUserError: null,
        userdata: { isLoggedIn: false }
      };
    }
    case LOGGED_USER_IN:
      return {
        ...state,
        isLoggingInUser: false,
        isLoggingInUserError: null,
        userData: { isLoggedIn: true, ...action.payload }
      };
    case LOGGING_USER_ERROR:
      return {
        ...state,
        isLoggingInUser: false,
        isLoggingInUserError: action.payload,
        userdata: { isLoggedIn: false }
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: { isLoggedIn: false, ...action.payload }
      };
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true,
        isCreatingUserError: null
      };
    case CREATED_USER:
      return {
        ...state,
        isCreatingUser: false,
        isCreatingUserError: null
      };
    case CREATING_USER_ERROR:
      return {
        ...state,
        isCreatingUser: false,
        isCreatingUserError: action.payload
      };
    case FETCHING_USERS:
      return {
        ...state,
        isFetchingProducts: true,
        isFetchingProductsError: null
      };
    case FETCHED_USERS:
      return {
        ...state,
        users: action.payload,
        isFetchingProducts: false,
        isFetchingProductsError: null
      };
    case FETCHING_USERS_ERROR:
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
