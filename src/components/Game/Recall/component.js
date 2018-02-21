// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'material-ui';

import CelebImage from '../../CelebImage';
import { next, changedInputText } from './actions';

import './styles.css';

type Props = {
  imageData: any,

  imageOrder: any,
  currIndex: number,
  inputText: string,

  handleNext: () => void,
  handleInputText: () => void,
  handleKeyPress: () => void,
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
      handleKeyPress: (event) => {
        if (event.key === 'Enter') {
          dispatch(next());
        }
      },
    };
  }

  render() {
    const {
      imageData, imageOrder, currIndex, inputText,
      handleNext, handleInputText, handleKeyPress,
    } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currCeleb = imageData[imageOrder[currIndex]];

    return (
      <div className="Recall">
        <div className="title">Recall</div>
        <div className="section">
          <CelebImage celeb={currCeleb} noLink />
          <br />
          <TextField
            placeholder="Name"
            value={inputText}
            onChange={handleInputText}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        <div className="section">
          <Button onClick={handleNext}>Next {`(${currIndex + 1}/${numItems})`}</Button>
        </div>
      </div>
    );
  }

}

export default connect(Recall.mapStateToProps, Recall.mapDispatchToProps)(Recall);
