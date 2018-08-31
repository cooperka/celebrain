// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto/index.css';

import App from './components/App/component';

import './styles.css';

// Enable Hot Module Replacement (HMR) for rendering.
if (module.hot) {
  module.hot.accept('./components/App/component', () => {
    // eslint-disable-next-line global-require
    const UpdatedApp = require('./components/App/component').default;
    renderRoot(UpdatedApp);
  });
}

renderRoot(App);

function renderRoot(AppComponent) {
  // Only if document is available; skip during static builds.
  if (typeof document !== 'undefined') {
    // $FlowFixMe
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

    renderMethod(
      <AppComponent />,
      // $FlowFixMe
      document.getElementById('root'),
    );
  }
}

// Export top level component for static rendering.
export default App;
