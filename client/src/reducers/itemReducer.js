/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POSTS_LOADING,
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false,
};

const editPost = (state, action) => {
  const posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
  return { ...state, posts };
};

const deletePost = (state, action) => {
  const posts = state.posts.filter((post) => post._id !== action.payload);
  return {
    ...state,
    posts,
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return { ...state, posts: action.payload };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case EDIT_POST:
      return { ...state, posts: action.payload };

    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
