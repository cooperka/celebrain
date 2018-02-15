// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { next } from './actions';

import imageData from '../../../../public/celebs/attribs';
import './styles.css';

type Props = {
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
    const { imageOrder, currIndex, handleNext } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currImage = imageData[imageOrder[currIndex]];

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
