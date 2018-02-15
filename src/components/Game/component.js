// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleGameState } from './actions';

import './styles.css';

type Props = {
  isActive: boolean,
  handleToggleGameState: () => void,
};

class Game extends Component<Props> {

  static mapStateToProps(state) {
    return {
      isActive: state.game.isActive,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleToggleGameState: () => {
        dispatch(toggleGameState());
      },
    };
  }

  render() {
    const { isActive, handleToggleGameState } = this.props;

    return (
      <div className="Game page">
        <div className="title">Game</div>

        <div className="section">
          <div className="subtitle">Lorem ipsum</div>
          <div className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <button onClick={handleToggleGameState}>{isActive ? 'Pause' : 'Play'}</button>
        </div>
      </div>
    );
  }

}

export default connect(Game.mapStateToProps, Game.mapDispatchToProps)(Game);
