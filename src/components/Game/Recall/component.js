// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { next } from './actions';

import './styles.css';

type Props = {
  currIndex: number,
  numItems: number,
  handleNext: () => void,
};

class Recall extends Component<Props> {

  static mapStateToProps(state) {
    return {
      currIndex: state.recall.currIndex,
      numItems: state.recall.numItems,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleNext: () => {
        dispatch(next());
      },
    };
  }

  render() {
    const { currIndex, numItems, handleNext } = this.props;

    return (
      <div className="Recall">
        <div className="title">Recall</div>
        <div className="section">
          <img src="http://via.placeholder.com/300x300" alt="Celebrity" />
          <input className="subtitle" placeholder="Name" />
        </div>
        <div className="section">
          <button onClick={handleNext}>Next {`${currIndex + 1} / ${numItems}`}</button>
        </div>
      </div>
    );
  }

}

export default connect(Recall.mapStateToProps, Recall.mapDispatchToProps)(Recall);
