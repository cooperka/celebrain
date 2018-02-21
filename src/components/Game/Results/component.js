// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

import './styles.css';

type Props = {
  imageData: any,

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
    const { imageData, imageOrder } = this.props;
    const celeb = imageData[imageOrder[index]];
    const actualName = celeb.name || '';
    const isMatch = guess.toLowerCase() === actualName.toLowerCase();
    const guessColor = isMatch ? 'correct' : 'incorrect';

    return (
      <Fragment key={index}>
        <div className="grid-item">
          <img src={celeb.image} alt="Celebrity" />
        </div>
        <div className="grid-item">
          <div className={`guess-text ${guessColor}`}>{isMatch ? '✓' : '❌'} {guess}</div>
          {isMatch ? null : <div className="guess-text">{actualName}</div>}
        </div>
      </Fragment>
    );
  }

  render() {
    const { inputs, handleRestart } = this.props;

    return (
      <div className="Results">
        <div className="title">Results</div>
        <div className="grid-container">
          {inputs.map((guess, index) => this.renderGuess(guess, index))}
        </div>
        <button onClick={handleRestart}>Try again</button>
      </div>
    );
  }

}

export default connect(Results.mapStateToProps, Results.mapDispatchToProps)(Results);
