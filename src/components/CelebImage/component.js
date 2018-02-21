// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';

import './styles.css';

type Props = {
  classes: any,
  celeb: any,
};

const styles = (theme) => ({
  shadowed: {
    boxShadow: theme.shadows[2],
  },
});

function CelebImage(props: Props) {
  const { classes, celeb } = props;

  return (
    <img
      className={classes.shadowed}
      src={celeb.image}
      alt="Celebrity"
    />
  );
}

export default withStyles(styles)(CelebImage);
