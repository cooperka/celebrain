import { setGameState } from '../actions';
import { gameState } from '../reducers';

// --- Action types

export const actionTypes = {
  MEMORIZE_NEXT: 'MEMORIZE_NEXT',
};

// --- Action creators

export function next() {
  return (dispatch, getState) => {
    const { memorize: { currIndex, numItems } } = getState();
    const nextIndex = currIndex + 1;

    if (nextIndex >= numItems) {
      dispatch(setGameState(gameState.RECALL));
    }

    dispatch({ type: actionTypes.MEMORIZE_NEXT });
  };
}
