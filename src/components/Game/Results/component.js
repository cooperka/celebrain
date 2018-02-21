// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import CelebImage from '../../CelebImage';

import celebUtils from '../../../utils/celeb-utils';
import { restart } from '../actions';

import './styles.css';

type Props = {
  imageData: any,

  imageOrder: any,
  inputs: any,
  onlyFirstNames: boolean,

  handleRestart: () => void,
};

class Results extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      inputs: state.recall.inputs,
      onlyFirstNames: state.settings.onlyFirstNames,
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
    const { imageData, imageOrder, onlyFirstNames } = this.props;
    const celeb = imageData[imageOrder[index]];
    const actualName = celebUtils.getName(celeb, onlyFirstNames);
    const isMatch = guess.trim().toLowerCase() === actualName.trim().toLowerCase();
    const guessColor = isMatch ? 'correct' : 'incorrect';

    return (
      <Fragment key={index}>
        <div className="grid-item">
          <CelebImage celeb={celeb} />
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
        <Button onClick={handleRestart}>Try again</Button>
      </div>
    );
  }

}

export default connect(Results.mapStateToProps, Results.mapDispatchToProps)(Results);
