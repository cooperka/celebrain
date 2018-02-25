import { times } from 'ramda';
import Immutable from 'immutable';

import celebs from '../celebs.json';

const numCelebs = celebs.length;
const percentileBoundaries = getPercentileBoundaries(celebs, 4);

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
 * @param {number} numQuestions
 * @param {Immutable.List} popularityGroups
 * @returns {array} An array of X unique random numbers,
 * each based on the total number of possible celebs.
 */
export function getRandomOrder(numQuestions, popularityGroups) {
  let set = Immutable.Set();
  while (set.size < numQuestions) {
    const index = getRandomInt(numCelebs);
    const { pageviews } = celebs[index];
    const percentileIndex = getPercentileIndex(percentileBoundaries, pageviews);
    if (IS_DEV) console.debug('Pageviews:', pageviews, 'Index:', percentileIndex);

    if (popularityGroups.get(percentileIndex)) {
      set = set.add(index);
    }
  }

  const order = set.toArray();
  if (IS_DEV) console.debug('Order:', order);
  return order;
}

/**
 * @returns {number} A random integer between 0 and (max - 1).
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getPercentileBoundaries(data, numGroups) {
  const sortedPageviews = getSortedPageviews(data);
  const numCelebsPerGroup = sortedPageviews.size / numGroups;
  return [...times((n) => sortedPageviews.get(Math.floor(numCelebsPerGroup * (n + 1))), numGroups - 1), 0];
}

export function getSortedPageviews(data) {
  return data
    .reduce((reduction, celeb) => reduction.push(celeb.pageviews || 0), Immutable.List().asMutable())
    .sort()
    .reverse()
    .asImmutable();
}

export function getPercentileIndex(boundaries, pageviews) {
  return boundaries.findIndex((boundary) => pageviews >= boundary);
}
