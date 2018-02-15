import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,
  numItems: 1,
};

export function memorizeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.MEMORIZE_NEXT:
      return {
        ...state,
        currIndex: state.currIndex + 1,
      };

    default:
      return state;
  }
}
