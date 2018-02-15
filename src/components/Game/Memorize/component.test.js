// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Memorize from './component';

it('renders', () => {
  const tree = renderer.create(<Memorize currIndex={0} numItems={1} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
