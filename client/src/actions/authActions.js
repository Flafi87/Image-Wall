import axios from "axios";
import { returnErrors } from "./errorActions";
import config from "../config";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD
} from "./types";

const { port } = config;

// Setup config/headers and token
const tokenConfig = getState => {
  // Get token from localstorage
  const { token } = getState().auth;
  const login = getState().auth.user;
  const { email } = getState().auth;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
    config.headers.login = login;
    config.headers.email = email;
  }

  return config;
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${port}/api/auth/user`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ login, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ login, email, password });

  axios
    .post(`${port}/api/users`, body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post(`${port}/api/auth`, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => ({
  type: LOGOUT_SUCCESS
});

export const changePassword = ({ login, email, password, newPassword }) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({
    login,
    email,
    password,
    newPassword
  });
  console.log(body);
  axios
    .post(`${port}/api/userupdate`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CHANGE_PASSWORD_FAIL"
        )
      );
      // dispatch({
      //   type: REGISTER_FAIL,
      // });
    });
};
