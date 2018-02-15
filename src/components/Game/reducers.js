import { actionTypes } from './actions';

export const gameState = {
  INTRO: 'INTRO',
  MEMORIZE: 'MEMORIZE',
  RECALL: 'RECALL',
  RESULTS: 'RESULTS',
};

const initialState = {
  currState: gameState.INTRO,
  imageOrder: [1, 0],
};

export function gameReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.TOGGLE_GAME_STATE:
      return {
        ...state,
        currState: payload.state,
      };

    case actionTypes.RESTART:
      return initialState;

    default:
      return state;
  }
}
