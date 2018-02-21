// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Results from './component';

it('renders', () => {
  const tree = renderer.create(
    <Results inputs={[]} />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
