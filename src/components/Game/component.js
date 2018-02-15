// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Intro from './Intro';
import Memorize from './Memorize';
import { gameState } from './reducers';

import './styles.css';

type Props = {
  currState: any,
};

const gameComponent = {
  [gameState.INTRO]: Intro,
  [gameState.MEMORIZE]: Memorize,
};

class Game extends Component<Props> {

  static mapStateToProps(state) {
    return {
      currState: state.game.currState,
    };
  }

  render() {
    const { currState } = this.props;
    const GameComponent = gameComponent[currState];

    return (
      <div className="Game page">
        <GameComponent />
      </div>
    );
  }

}

// $FlowFixMe
export default connect(Game.mapStateToProps)(Game);
