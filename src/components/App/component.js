// @flow

import React from 'react';
import { Router, Route, Switch } from 'react-static';
import { Reboot } from 'material-ui';
import ReduxDevTools from '../ReduxDevTools';

import routes from '../../routes';

import NavBar from '../NavBar';
import Footer from '../Footer';
import NotFound from '../NotFound';

import './styles.css';

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
    <Router>
      <div className="App">
        <Reboot />
        <NavBar />
        {renderRoutes()}
        <Footer />
        <ReduxDevTools />
      </div>
    </Router>
  );
}

export default App;
