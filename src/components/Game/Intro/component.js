// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGameState } from '../actions';
import { gameState } from '../reducers';

import './styles.css';

type Props = {
  handleStartGame: () => void,
};

class Intro extends Component<Props> {

  static mapDispatchToProps(dispatch) {
    return {
      handleStartGame: () => {
        dispatch(setGameState(gameState.MEMORIZE));
      },
    };
  }

  render() {
    const { handleStartGame } = this.props;

    return (
      <div className="Intro">
        <button onClick={handleStartGame}>Start</button>
      </div>
    );
  }

}

export default connect(undefined, Intro.mapDispatchToProps)(Intro);
