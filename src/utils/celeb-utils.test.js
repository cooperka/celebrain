import imageData from '../celebs.json';

import { getDisplayName } from './celeb-utils';

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
});
