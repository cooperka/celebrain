// @flow

import * as R from 'ramda';
import classNames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from 'material-ui';

import { size } from '../../constants';

import './styles.css';

type Props = {
  classes: Object,
};

class Footer extends Component<Props> {

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.footer, 'Footer')}>
        <div>
          &copy; 2020 Kevin Cooper &bull;
          {' '}
          <a href="https://github.com/cooperka/neuro-name">View source</a>
        </div>
        <div>Images are sourced from Wikipedia and may be subject to copyright.</div>
      </div>
    );
  }

}

const styles = () => ({
  footer: {
    height: size.FOOTER_HEIGHT,
  },
});

export default R.compose(
  withStyles(styles),
)(Footer);
