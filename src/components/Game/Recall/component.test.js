// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Recall from './component';

import imageData from '../../../../public/celebs.json';

it('renders', () => {
  const tree = renderer.create(<Recall imageData={imageData} currIndex={0} numItems={1} imageOrder={[0]} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
