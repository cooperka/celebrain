// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Intro from './component';

it('renders', () => {
  const tree = renderer.create(<Intro />);
  expect(tree.toJSON()).toMatchSnapshot();
});
