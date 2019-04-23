import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POSTS_LOADING
} from "../actions/types";
import _ from "lodash";

const initialState = {
  posts: [],
  loading: false
};

function editPost(state, action) {
  const posts = state.posts.map(post =>
    post._id === action.payload._id ? action.payload : post
  );
  return { ...state, posts };
}

function deletePost(state, action) {
  const posts = state.posts.filter(post => post._id !== action.payload);
  return {
    ...state,
    posts
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case DELETE_POST:
      return deletePost(state, action);
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case EDIT_POST:
      return editPost(state, action);

    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
