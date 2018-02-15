// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

import imageData from '../../../../public/celebs/attribs';
import './styles.css';

type Props = {
  imageOrder: any,
  inputs: any,

  handleRestart: () => void,
};

class Results extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      inputs: state.recall.inputs,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleRestart: () => {
        dispatch(restart());
      },
    };
  }

  renderGuess(guess = '', index) {
    const { imageOrder } = this.props;
    const actualName = imageData[imageOrder[index]].name || '';
    const isMatch = guess.toLowerCase() === actualName.toLowerCase();

    return (
      <div className="guess" key={index}>{isMatch ? '✓' : '❌'} {guess}</div>
    );
  }

  render() {
    const { inputs, handleRestart } = this.props;

    return (
      <div className="Results">
        <div className="title">Results</div>
        {inputs.map((guess, index) => this.renderGuess(guess, index))}
        <button onClick={handleRestart}>Try again</button>
      </div>
    );
  }

}

export default connect(Results.mapStateToProps, Results.mapDispatchToProps)(Results);
