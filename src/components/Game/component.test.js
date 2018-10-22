// @flow

import R from 'ramda';
import React from 'react';
import renderer from 'react-test-renderer';

import Game from './component';

import { gameState } from './reducers';

jest.mock('./Intro/component', () => 'Intro');
jest.mock('./Memorize/component', () => 'Memorize');
jest.mock('./Recall/component', () => 'Recall');
jest.mock('./Results/component', () => 'Results');

describe('renders in state', () => {
  R.flip(R.forEachObjIndexed)(gameState, (state) => {
    it(state, () => {
      const tree = renderer.create(<Game currState={state} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
