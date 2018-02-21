// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

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
        <div className="title">New game</div>
        <Button className="start" onClick={handleStartGame}>Start</Button>
      </div>
    );
  }

}

export default connect(undefined, Intro.mapDispatchToProps)(Intro);
