// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Intro from './component';

it('renders', () => {
  const tree = renderer.create(
    <Intro popularityGroups={[true]} />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
