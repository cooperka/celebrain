// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { next } from './actions';

import './styles.css';

type Props = {
  imageData: any,

  imageOrder: any,
  currIndex: number,
  handleNext: () => void,
};

class Memorize extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      currIndex: state.memorize.currIndex,
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
    const { imageData, imageOrder, currIndex, handleNext } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currCeleb = imageData[imageOrder[currIndex]];

    return (
      <div className="Memorize">
        <div className="title">Memorize</div>
        <div className="section">
          <img src={currCeleb.image} alt="Celebrity" />
          <div className="subtitle">{currCeleb.name}</div>
        </div>
        <div className="section">
          <button onClick={handleNext}>Next {`${currIndex + 1} / ${numItems}`}</button>
        </div>
      </div>
    );
  }

}

export default connect(Memorize.mapStateToProps, Memorize.mapDispatchToProps)(Memorize);
