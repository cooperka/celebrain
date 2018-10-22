// @flow

import * as R from 'ramda';
import React from 'react';
import { withStyles } from 'material-ui';

import './styles.css';

type Props = {
  classes: Object,
  celeb: Object,
  noLink: boolean,
};

function CelebImage(props: Props) {
  const { classes, celeb, noLink } = props;

  const image = (
    <img
      className={classes.shadowed}
      src={celeb.image}
      alt="Celebrity"
    />
  );

  return noLink ? image : (
    <a href={`https://commons.wikimedia.org/wiki/File:${celeb.filename}`}>
      {image}
    </a>
  );
}

const styles = (theme) => ({
  shadowed: {
    boxShadow: theme.shadows[2],
  },
});

export default R.compose(
  withStyles(styles),
)(CelebImage);
