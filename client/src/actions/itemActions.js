/* eslint-disable no-undef */
import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POSTS_LOADING
} from "./types";
import { returnErrors } from "./errorActions";
import config from "../config";

const { port } = config;

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

export const setItemsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get(`${port}/api/posts`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = post => (dispatch, getState) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("user", post.user);
  formData.append("login", post.login);
  formData.append("productImage", post.productImage);

  axios
    .post(`${port}/api/posts`, formData, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editItem = post => (dispatch, getState) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("user", post.user);
  formData.append("login", post.login);
  formData.append("productImage", post.productImage);
  axios
    .put(
      `${port}/api/posts/update/${post.id}`,
      formData,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: EDIT_POST,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`${port}/api/posts/${id}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
