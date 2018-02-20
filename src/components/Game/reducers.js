import { times } from 'ramda';

import { actionTypes } from './actions';

import imageData from '../../../public/celebs.json';

export const gameState = {
  INTRO: 'INTRO',
  MEMORIZE: 'MEMORIZE',
  RECALL: 'RECALL',
  RESULTS: 'RESULTS',
};

const initialState = {
  currState: gameState.INTRO,
  imageOrder: getRandomOrder(),
};

/**
 * @returns {array} An array of X random numbers,
 * each based on the total number of possible celebs.
 */
function getRandomOrder(numQuestions = 5) {
  const numCelebs = imageData.length;
  return times(() => getRandomInt(numCelebs), numQuestions);
}

/**
 * @returns {number} A random integer between 0 and (max - 1).
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function gameReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.TOGGLE_GAME_STATE:
      return {
        ...state,
        currState: payload.state,
      };

    case actionTypes.RESTART:
      return {
        ...initialState,
        imageOrder: getRandomOrder(),
      };

    default:
      return state;
  }
}
