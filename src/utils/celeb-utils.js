import Immutable from 'immutable';

import imageData from '../celebs.json';

const numCelebs = imageData.length;

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * @returns {string} A name to show for a given celebrity.
 */
export function getDisplayName({ title = '' }, onlyFirstName) {
  // Remove any trailing annotation (e.g. "(Actor)").
  const realName = title.replace(/ \(.*/, '').trim();

  return onlyFirstName
    ? realName.split(' ')[0]
    : realName;
}

/**
 * @returns {array} An array of X unique random numbers,
 * each based on the total number of possible celebs.
 */
export function getRandomOrder(numQuestions = 5) {
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
