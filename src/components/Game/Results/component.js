// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

import './styles.css';

type Props = {
  inputs: any,
  handleRestart: () => void,
};

class Results extends Component<Props> {

  static mapStateToProps(state) {
    return {
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

  renderGuess(guess, index) {
    return (
      <div className="guess" key={index}>{guess}</div>
    );
  }

  render() {
    const { inputs, handleRestart } = this.props;

    return (
      <div className="Results">
        <div className="title">Results</div>
        {inputs.map(this.renderGuess)}
        <button onClick={handleRestart}>Try again</button>
      </div>
    );
  }

}

export default connect(Results.mapStateToProps, Results.mapDispatchToProps)(Results);
