// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { next } from './actions';

import imageData from '../../../../public/celebs/attribs';
import './styles.css';

type Props = {
  currIndex: number,
  numItems: number,
  handleNext: () => void,
};

class Memorize extends Component<Props> {

  static mapStateToProps(state) {
    return {
      currIndex: state.memorize.currIndex,
      numItems: state.memorize.numItems,
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
    const currImage = imageData[currIndex];

    return (
      <div className="Memorize">
        <div className="title">Memorize</div>
        <div className="section">
          <img src={`/celebs/${currImage.filename}`} alt="Celebrity" />
          <div className="subtitle">{currImage.name}</div>
        </div>
        <div className="section">
          <button onClick={handleNext}>Next {`${currIndex + 1} / ${numItems}`}</button>
        </div>
      </div>
    );
  }

}

export default connect(Memorize.mapStateToProps, Memorize.mapDispatchToProps)(Memorize);
