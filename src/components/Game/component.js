// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Memorize from './Memorize';
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
        <button onClick={handleToggleGameState}>{isActive ? 'Pause' : 'Play'}</button>
        {isActive ? <Memorize /> : null}
      </div>
    );
  }

}

export default connect(Game.mapStateToProps, Game.mapDispatchToProps)(Game);
