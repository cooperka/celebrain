import { times } from 'ramda';
import uniqueRandFactory from 'unique-random';

import { actionTypes } from './actions';

import imageData from '../../../public/celebs.json';

const numCelebs = imageData.length;
const getUniqueRand = uniqueRandFactory(0, numCelebs - 1);

const IS_DEV = process.env.NODE_ENV === 'development';

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
 * @returns {array} An array of X unique random numbers,
 * each based on the total number of possible celebs.
 */
function getRandomOrder(numQuestions = 5) {
  const order = times(() => getUniqueRand(), numQuestions);
  if (IS_DEV) console.debug('Order:', order);
  return order;
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
