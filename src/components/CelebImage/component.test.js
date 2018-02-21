// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import imageData from '../../celebs.json';

import CelebImage from './component';

it('renders', () => {
  const tree = renderer.create(<CelebImage celeb={imageData[0]} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
