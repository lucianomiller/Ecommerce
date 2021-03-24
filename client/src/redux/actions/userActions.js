import {
  CREATED_USER,
  CREATING_USER,
  CREATING_USER_ERROR,
  FETCHED_USERS,
  FETCHING_USERS,
  FETCHING_USERS_ERROR,
  LOGGING_USER,
  DELETED_USER,
  LOGGED_USER_IN,
  LOGGING_USER_ERROR,
  FETCHED_USER_DATA,
  FETCHING_USER_DATA,
  FETCHING_USER_DATA_ERROR,
  LOGOUT_USER,
  CHANGE_PASS,
  FORCE_CHANGE_PASS,
  PROMOVE_ADMIN,
} from "../constants/user";
import axios from "axios";
import {
  postUser,
  getUsers,
  getLogout,
  putResetPassword,
  putBannedUser,
  putForceResetUserPass,
  putPromoveAdmin,
  postGoogleLogin,
} from "../../api";

export const fetchUserData = () => (dispatch) => {
  dispatch({ type: FETCHING_USER_DATA });

  return axios
    .get(`http://localhost:3001/user/isLoggedIn`, { withCredentials: true })
    .then((resp) => {
      dispatch({ type: FETCHED_USER_DATA, payload: resp.data });
      return resp.data;
    })
    .catch((e) => {
      dispatch({ type: FETCHING_USER_DATA_ERROR, payload: e });
    });
};

export const createUser = (data) => (dispatch) => {
  dispatch({ type: CREATING_USER });

  return postUser(data)
    .then((resp) => {
      dispatch({ type: CREATED_USER, payload: resp })
      return resp.data
      
    })
    .catch((e) => {
      dispatch({ type: CREATING_USER_ERROR, payload: e });
      throw e;
    });
};

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: FETCHING_USERS });
  getUsers()
    .then((resp) => {
      dispatch({ type: FETCHED_USERS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_USERS_ERROR, payload: e });
    })
};

export const loginUser = (data) => (dispatch) => {
  dispatch({ type: LOGGING_USER });
  if (data.loginField.includes("@")) {
    return axios
      .post(`http://localhost:3001/user/login/email`, data, {
        withCredentials: true,
      })
      .then((resp) => {
        dispatch({ type: LOGGED_USER_IN, payload: resp.data });
        return resp.data;
      })
      .catch((e) => {
        dispatch({ type: LOGGING_USER_ERROR, payload: e });
        throw e;
      });
  } 
    return axios
      .post(`http://localhost:3001/user/login/username`, data, {
        withCredentials: true,
      })
      .then((resp) => {
        dispatch({ type: LOGGED_USER_IN, payload: resp.data });
        return resp.data;
      })
      .catch((e) => {
        dispatch({ type: LOGGING_USER_ERROR, payload: e });
        throw e;
      });
  
};

export const logoutUser = (data) => (dispatch) => {
  getLogout().then((res) => {
    dispatch({ type: LOGOUT_USER, payload: res.data });
  });
};

export const deleteUser = (data) => (dispatch) => {
  putBannedUser(data).then((resp) => {
    dispatch({ type: DELETED_USER, payload: resp.data });
    dispatch(fetchUsers());
  });
};

export const forceResetUserPass = (data) => (dispatch) => {
  putForceResetUserPass(data).then((resp) => {
    dispatch({ type: FORCE_CHANGE_PASS, payload: resp.data });
  });
};

export const resetUserPass = (data) => (dispatch) => {
  putResetPassword(data)
    .then((resp) => {
      dispatch({ type: CHANGE_PASS, payload: resp.data });
    })
    .catch((error) => {});
};

export const promoveAdmin = (data) => (dispatch) => {
  putPromoveAdmin(data).then((resp) => {
    dispatch({ type: PROMOVE_ADMIN, payload: resp.data });
  });
};

