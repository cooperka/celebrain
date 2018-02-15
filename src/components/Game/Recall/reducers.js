import { actionTypes as gameActionTypes } from '../actions';
import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,
  numItems: 2,

  inputText: '',
};

export function recallReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.RECALL_NEXT:
      return {
        ...state,
        currIndex: state.currIndex + 1,
        inputText: initialState.inputText,
      };

    case actionTypes.CHANGED_INPUT_TEXT:
      return {
        ...state,
        inputText: payload.text,
      };

    case gameActionTypes.RESTART:
      return initialState;

    default:
      return state;
  }
}
