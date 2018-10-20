// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { withStyles } from 'material-ui';

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

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
)(Footer);
