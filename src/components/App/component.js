// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { Router } from 'react-static';
import { Provider } from 'react-redux';
import { createMuiTheme, withStyles, Reboot, MuiThemeProvider } from 'material-ui';

// This module is declared directly by react-static.
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/extensions, $FlowFixMe
import Routes from 'react-static-routes';

import { string } from '../../constants';

import rootReducer from '../../reducers.index';
import { configureStore } from '../../utils/setup-utils';

import ReduxDevTools from '../ReduxDevTools/component';
import NavBar from '../NavBar/component';
import Footer from '../Footer/component';

import { theme } from './theme';
import './styles.css';

const muiTheme = createMuiTheme(theme);

const store = configureStore(rootReducer);

// Enable Hot Module Replacement (HMR) for Redux.
if (module.hot) {
  module.hot.accept('../../reducers.index', () => {
    // eslint-disable-next-line global-require
    const updatedReducer = require('../../reducers.index').default;
    store.replaceReducer(updatedReducer);
  });
}

type Props = {
};

class App extends Component<Props> {

  /**
   * Remove the statically injected CSS.
   * https://material-ui.com/guides/server-rendering
   */
  componentDidMount() {
    const jssStyles = document.getElementById(string.JSS_SERVER_SIDE_ID);
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Router>
            <div className="App">
              <Reboot />
              <NavBar />
              <Routes />
              <Footer />
              <ReduxDevTools />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }

}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
)(App);
