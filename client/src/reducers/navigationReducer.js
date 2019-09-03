import { CHANGE_PAGE } from '../actions/types';

const initialState = {
  active_page: 'posts',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        active_page: action.payload,
      };
    default:
      return state;
  }
}
