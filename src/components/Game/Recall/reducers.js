import Immutable from 'immutable';

import { actionTypes as gameActionTypes } from '../actions';
import { actionTypes } from './actions';

const initialState = {
  currIndex: 0,

  inputText: '',
  inputs: Immutable.List(),
};

export function recallReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.RECALL_NEXT:
      return {
        ...state,
        currIndex: state.currIndex + 1,
        inputText: initialState.inputText,
        inputs: state.inputs.push(state.inputText),
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
