// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Home from './component';

it('renders', () => {
  const tree = renderer.create(<Home />);
  expect(tree.toJSON()).toMatchSnapshot();
});
