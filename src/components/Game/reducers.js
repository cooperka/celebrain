import Immutable from 'immutable';

import { actionTypes } from './actions';

import imageData from '../../celebs.json';

const numCelebs = imageData.length;

const IS_DEV = process.env.NODE_ENV === 'development';

export const gameState = {
  INTRO: 'INTRO',
  MEMORIZE: 'MEMORIZE',
  RECALL: 'RECALL',
  RESULTS: 'RESULTS',
};

const initialGameState = {
  currState: gameState.INTRO,
  imageOrder: undefined,
};

export function gameReducer(state = initialGameState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.TOGGLE_GAME_STATE: {
      const isNewGame = payload.state === gameState.MEMORIZE;

      return {
        ...state,
        currState: payload.state,
        imageOrder: isNewGame ? getRandomOrder() : state.imageOrder,
      };
    }

    case actionTypes.RESTART:
      return initialGameState;

    default:
      return state;
  }
}

const initialSettingsState = {
  onlyFirstNames: false,
  popularityGroups: Immutable.List([true, false, false, false]),
};

export function settingsReducer(state = initialSettingsState, { type, payload } = {}) {
  switch (type) {
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

    default:
      return state;
  }
}

/**
 * @returns {array} An array of X unique random numbers,
 * each based on the total number of possible celebs.
 */
function getRandomOrder(numQuestions = 5) {
  let set = Immutable.Set();
  while (set.size < numQuestions) {
    set = set.add(getRandomInt(numCelebs));
  }

  const order = set.toArray();
  if (IS_DEV) console.debug('Order:', order);
  return order;
}

/**
 * @returns {number} A random integer between 0 and (max - 1).
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
