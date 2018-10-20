// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';

import Intro from './Intro';
import Memorize from './Memorize';
import Recall from './Recall';
import Results from './Results';
import { gameState } from './reducers';

import imageData from '../../celebs.json';
import './styles.css';

const gameComponent = {
  [gameState.INTRO]: Intro,
  [gameState.MEMORIZE]: Memorize,
  [gameState.RECALL]: Recall,
  [gameState.RESULTS]: Results,
};

type Props = {
  currState: any,
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

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
  // $FlowFixMe
  connect(Game.mapStateToProps),
)(Game);
