import { actionTypes as gameActionTypes } from '../actions';
import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,
  numItems: 2,
};

export function memorizeReducer(state = initialState, action = {}) {
  switch (action.type) {
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
