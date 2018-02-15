// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import App from './component';

jest.mock('../NavBar/component', () => 'NavBar');
jest.mock('../Home/component', () => 'Home');
jest.mock('../Footer/component', () => 'Footer');

it('renders', () => {
  const tree = renderer.create(<App />);
  expect(tree.toJSON()).toMatchSnapshot();
});
