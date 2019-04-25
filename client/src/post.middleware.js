import { EDIT_POST, DELETE_POST } from "./actions/types";

export const editPost = ({ getState }) => next => ({ type, payload }) => {
  if (type === EDIT_POST) {
    const { post } = getState();
    const updatedPosts = post.posts.map(post =>
      post._id === payload._id ? payload : post
    );
    return next({ type, payload: updatedPosts });
  }
  return next({ type, payload });
};

export const deletePost = ({ getState }) => next => ({ type, payload }) => {
  if (type === DELETE_POST) {
    const { post } = getState();
    const updatedPosts = post.posts.filter(post => post._id !== payload);
    return next({ type, payload: updatedPosts });
  }
  return next({ type, payload });
};
