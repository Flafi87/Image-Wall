import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POSTS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/posts", tokenConfig(getState))
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
  // const config = {
  //   headers: {
  //     "content-type": "multipart/form-data"
  //   }
  // };

  axios
    .post("/api/posts", formData, tokenConfig(getState))
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
    .put(`/api/posts/update/${post.id}`, formData, tokenConfig(getState))
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
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
