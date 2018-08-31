// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';

import Intro from './Intro/component';
import Memorize from './Memorize/component';
import Recall from './Recall/component';
import Results from './Results/component';
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
