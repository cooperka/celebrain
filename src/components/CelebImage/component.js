// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';

import './styles.css';

type Props = {
  classes: any,
  celeb: any,
  noLink: boolean,
};

const styles = (theme) => ({
  shadowed: {
    boxShadow: theme.shadows[2],
  },
});

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

export default withStyles(styles)(CelebImage);
