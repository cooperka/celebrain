import imageData from '../celebs.json';

import { getDisplayName, getPercentileBoundaries, getSortedPageviews, getPercentileIndex } from './celeb-utils';

const mockPageviews = [4, 5, 6, 1, 2, 3, 7, 8].map((n) => ({ pageviews: n }));

describe('celeb utils', () => {
  it('gets display names for celebs.json', () => {
    const displayName = getDisplayName(imageData[0]);
    expect(displayName).toMatchSnapshot();
  });

  const titles = ['', 'Foo', 'Foo Bar', 'Foo Bar Baz', 'Foo Bar (Actor)'];

  titles.forEach((title) => {
    it(`gets display full-name for '${title}'`, () => {
      const displayName = getDisplayName({ title });
      expect(displayName).toMatchSnapshot();
    });
  });

  titles.forEach((title) => {
    it(`gets display first-name for '${title}'`, () => {
      const displayName = getDisplayName({ title }, true);
      expect(displayName).toMatchSnapshot();
    });
  });

  it('gets percentile boundaries (2 groups)', () => {
    const boundaries = getPercentileBoundaries(mockPageviews, 2);
    expect(boundaries).toMatchSnapshot();
  });

  it('gets percentile boundaries (4 groups)', () => {
    const boundaries = getPercentileBoundaries(mockPageviews, 4);
    expect(boundaries).toMatchSnapshot();
  });

  it('gets sorted pageviews', () => {
    const sorted = getSortedPageviews(mockPageviews);
    expect(sorted).toMatchSnapshot();
  });

  it('gets percentile index (2 groups)', () => {
    let index;

    index = getPercentileIndex([10, 5, 0], 99);
    expect(index).toBe(0);

    index = getPercentileIndex([10, 5, 0], 7);
    expect(index).toBe(1);

    index = getPercentileIndex([10, 5, 0], 0);
    expect(index).toBe(2);
  });
});
