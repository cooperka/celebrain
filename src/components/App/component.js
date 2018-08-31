// @flow

import * as R from 'ramda';
import React from 'react';
import { Router, Route, Switch } from 'react-static';
import { Provider } from 'react-redux';
import { createMuiTheme, withStyles, Reboot, MuiThemeProvider } from 'material-ui';

import ReduxDevTools from '../ReduxDevTools/component';

import rootReducer from '../../reducers.index';
import { configureStore } from '../../utils/setup-utils';
import routes from '../../routes';

import NavBar from '../NavBar/component';
import Footer from '../Footer/component';
import NotFound from '../NotFound/component';

import './styles.css';

const theme = createMuiTheme({
  // https://material-ui-next.com/customization/themes/#typography
  typography: {
    // Account for base font-size of 62.5%.
    htmlFontSize: 10,
  },
});

const store = configureStore(rootReducer);

// Enable Hot Module Replacement (HMR) for Redux.
if (module.hot) {
  module.hot.accept('../../reducers.index', () => {
    // eslint-disable-next-line global-require
    const updatedReducer = require('../../reducers.index').default;
    store.replaceReducer(updatedReducer);
  });
}

/**
 * Render the first main route that matches the current path,
 * or NotFound if no match.
 */
function renderRoutes() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} exact path={route.path} component={route.component} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Reboot />
            <NavBar />
            {renderRoutes()}
            <Footer />
            <ReduxDevTools />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
)(App);
