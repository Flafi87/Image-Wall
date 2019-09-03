import { CHANGE_PAGE } from './types';

// eslint-disable-next-line import/prefer-default-export
export const changePage = (page) => (dispatch) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: page,
  });
};
