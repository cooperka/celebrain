// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { next, changedInputText } from './actions';

import imageData from '../../../../public/celebs/attribs';
import './styles.css';

type Props = {
  imageOrder: any,
  currIndex: number,
  inputText: string,

  handleNext: () => void,
  handleInputText: () => void,
};

class Recall extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      currIndex: state.recall.currIndex,
      inputText: state.recall.inputText,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleNext: () => {
        dispatch(next());
      },
      handleInputText: (event) => {
        dispatch(changedInputText(event.target.value));
      },
    };
  }

  render() {
    const { imageOrder, currIndex, inputText, handleNext, handleInputText } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currImage = imageData[imageOrder[currIndex]];

    return (
      <div className="Recall">
        <div className="title">Recall</div>
        <div className="section">
          <img src={`/celebs/${currImage.filename}`} alt="Celebrity" />
          <br />
          <input className="subtitle" placeholder="Name" value={inputText} onChange={handleInputText} />
        </div>
        <div className="section">
          <button onClick={handleNext}>Next {`${currIndex + 1} / ${numItems}`}</button>
        </div>
      </div>
    );
  }

}

export default connect(Recall.mapStateToProps, Recall.mapDispatchToProps)(Recall);
