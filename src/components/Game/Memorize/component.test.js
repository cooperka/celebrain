// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Game from './component';

it('renders', () => {
  const tree = renderer.create(<Game />);
  expect(tree.toJSON()).toMatchSnapshot();
});
