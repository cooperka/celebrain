// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Intro from './Intro';
import Memorize from './Memorize';
import Recall from './Recall';
import Results from './Results';
import { gameState } from './reducers';

import imageData from '../../celebs.json';
import './styles.css';

type Props = {
  currState: any,
};

const gameComponent = {
  [gameState.INTRO]: Intro,
  [gameState.MEMORIZE]: Memorize,
  [gameState.RECALL]: Recall,
  [gameState.RESULTS]: Results,
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
        <GameComponent imageData={imageData} />
      </div>
    );
  }

}

// $FlowFixMe
export default connect(Game.mapStateToProps)(Game);
