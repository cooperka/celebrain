// @flow

import * as R from 'ramda';
import React from 'react';
import { NavLink } from 'react-static';
import { withStyles, Button } from 'material-ui';

import './styles.css';

type Props = {
  linkTo?: string,
  externalLinkTo?: string,
  bordered?: boolean,
  children: any,
};

function NavButton(props: Props) {
  const { linkTo, externalLinkTo, bordered, children } = props;
  const isRouterLink = !!linkTo;

  const extraProps = isRouterLink ? {
    exact: true,
  } : {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <Button
      component={isRouterLink ? NavLink : 'a'}
      className={['NavButton', bordered ? 'bordered' : ''].join(' ')}
      to={linkTo}
      href={externalLinkTo}
      {...extraProps}
    >
      <div className="link-text">
        {children}
      </div>
    </Button>
  );
}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
)(NavButton);
