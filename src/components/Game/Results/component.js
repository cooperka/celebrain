// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGameState } from '../actions';
import { gameState } from '../reducers';

import './styles.css';

type Props = {
  handleStartGame: () => void,
};

class Results extends Component<Props> {

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
      <div className="Results">
        <div className="title">Results</div>
        <button onClick={handleStartGame}>Try again</button>
      </div>
    );
  }

}

export default connect(undefined, Results.mapDispatchToProps)(Results);
