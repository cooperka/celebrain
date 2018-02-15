// --- Action types

import { setGameState } from '../actions';
import { gameState } from '../reducers';

export const actionTypes = {
  RECALL_NEXT: 'RECALL_NEXT',
};

// --- Action creators

export function next() {
  return (dispatch, getState) => {
    const { recall: { currIndex, numItems } } = getState();
    const nextIndex = currIndex + 1;

    if (nextIndex >= numItems) {
      dispatch(setGameState(gameState.RESULTS));
    } else {
      dispatch({ type: actionTypes.RECALL_NEXT });
    }
  };
}
