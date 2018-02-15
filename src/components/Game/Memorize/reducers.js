import { actionTypes as gameActionTypes } from '../actions';
import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,
};

export function memorizeReducer(state = initialState, { type } = {}) {
  switch (type) {
    case actionTypes.MEMORIZE_NEXT:
      return {
        ...state,
        currIndex: state.currIndex + 1,
      };

    case gameActionTypes.RESTART:
      return initialState;

    default:
      return state;
  }
}
