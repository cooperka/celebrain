// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Intro from './Intro';
import Memorize from './Memorize';
import Recall from './Recall';
import Results from './Results';
import { gameState } from './reducers';

import imageData from '../../../public/celebs.json';
import './styles.css';

type Props = {
  classes: any,

  currState: any,
};

const gameComponent = {
  [gameState.INTRO]: Intro,
  [gameState.MEMORIZE]: Memorize,
  [gameState.RECALL]: Recall,
  [gameState.RESULTS]: Results,
};

const styles = (theme) => ({
  shadowed: {
    boxShadow: theme.shadows[2],
  },
});

class Game extends Component<Props> {

  static mapStateToProps(state) {
    return {
      currState: state.game.currState,
    };
  }

  render() {
    const { classes, currState } = this.props;
    const GameComponent = gameComponent[currState];

    return (
      <div className="Game page">
        <GameComponent imageData={imageData} classes={classes} />
      </div>
    );
  }

}

const styledGame = withStyles(styles)(Game);
// $FlowFixMe
export default connect(Game.mapStateToProps)(styledGame);
