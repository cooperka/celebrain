// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Memorize from './Memorize';
import { setGameState } from './actions';
import { gameState } from './reducers';

import './styles.css';

type Props = {
  currState: any,
  handleStartGame: () => void,
};

const gameComponent = {
  [gameState.INTRO]: () => null,
  [gameState.MEMORIZE]: Memorize,
};

class Game extends Component<Props> {

  static mapStateToProps(state) {
    return {
      currState: state.game.currState,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleStartGame: () => {
        dispatch(setGameState(gameState.MEMORIZE));
      },
    };
  }

  render() {
    const { currState, handleStartGame } = this.props;
    const GameComponent = gameComponent[currState];
    const hasBegun = currState !== gameState.INTRO;

    return (
      <div className="Game page">
        {hasBegun ? <GameComponent /> : <button onClick={handleStartGame}>Start</button>}
      </div>
    );
  }

}

export default connect(Game.mapStateToProps, Game.mapDispatchToProps)(Game);
