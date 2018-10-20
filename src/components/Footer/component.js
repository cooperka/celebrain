// @flow

import React, { Component } from 'react';

import './styles.css';

type Props = {
};

class Footer extends Component<Props> {

  render() {
    return (
      <div className="Footer">
        <div>&copy; 2018 Kevin Cooper</div>
        <div>Images are sourced from Wikipedia and may be subject to copyright.</div>
      </div>
    );
  }

}

export default Footer;
