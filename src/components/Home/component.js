// @flow

import React, { Component } from 'react';

import NavButton from '../NavButton/index';

import './styles.css';

type Props = {
};

class Home extends Component<Props> {

  render() {
    return (
      <div className="Home page">
        <div className="title">NeuroName</div>
        <div className="section">
          <div className="subtitle">
            Improve your memory by matching celebrity names to faces.
          </div>
        </div>
        <div className="buttons">
          <NavButton bordered linkTo="/game">Play now</NavButton>
        </div>
      </div>
    );
  }

}

export default Home;
