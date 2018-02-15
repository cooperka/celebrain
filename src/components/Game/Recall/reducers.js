import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,
  numItems: 1,
};

export function recallReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.RECALL_NEXT:
      return {
        ...state,
        currIndex: state.currIndex + 1,
      };

    default:
      return state;
  }
}
