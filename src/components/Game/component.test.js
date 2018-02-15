// @flow

import R from 'ramda';
import React from 'react';
import renderer from 'react-test-renderer';

import Game from './component';

import { gameState } from './reducers';

jest.mock('./Intro', () => 'Intro');
jest.mock('./Memorize', () => 'Memorize');

describe('renders in state', () => {
  R.flip(R.forEachObjIndexed)(gameState, (state) => {
    it(state, () => {
      const tree = renderer.create(<Game currState={state} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
