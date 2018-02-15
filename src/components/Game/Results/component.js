// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

import './styles.css';

type Props = {
  handleRestart: () => void,
};

class Results extends Component<Props> {

  static mapDispatchToProps(dispatch) {
    return {
      handleRestart: () => {
        dispatch(restart());
      },
    };
  }

  render() {
    const { handleRestart } = this.props;

    return (
      <div className="Results">
        <div className="title">Results</div>
        <button onClick={handleRestart}>Try again</button>
      </div>
    );
  }

}

export default connect(undefined, Results.mapDispatchToProps)(Results);
