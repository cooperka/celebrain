import Immutable from 'immutable';

import { getRandomOrder } from '../../utils/celeb-utils';
import { actionTypes } from './actions';

export const gameState = {
  INTRO: 'INTRO',
  MEMORIZE: 'MEMORIZE',
  RECALL: 'RECALL',
  RESULTS: 'RESULTS',
};

const initialGameState = {
  currState: gameState.INTRO,
  imageOrder: undefined,

  // --- Settings.
  numCelebs: 5,
  onlyFirstNames: false,
  popularityGroups: Immutable.List([true, false, false, false]),
};

export function gameReducer(state = initialGameState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.TOGGLE_GAME_STATE: {
      const isNewGame = payload.state === gameState.MEMORIZE;

      return {
        ...state,
        currState: payload.state,
        imageOrder: isNewGame ? getRandomOrder(state.numCelebs, state.popularityGroups) : state.imageOrder,
      };
    }

    case actionTypes.SET_NUM_CELEBS:
      return {
        ...state,
        numCelebs: Math.max(payload.numCelebs, 1),
      };

    case actionTypes.SET_ONLY_FIRST_NAMES:
      return {
        ...state,
        onlyFirstNames: payload.isChecked,
      };

    case actionTypes.SET_POPULARITY:
      return {
        ...state,
        popularityGroups: state.popularityGroups.set(payload.groupIndex, payload.isChecked),
      };

    case actionTypes.RESTART:
      return initialGameState;

    default:
      return state;
  }
}
