// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'typeface-roboto/index.css';

import rootReducer from './reducers.index';
import { configureStore } from './utils/setup-utils';

import App from './components/App';

import './styles.css';

const store = configureStore(rootReducer);

// Enable Hot Module Replacement (HMR).
if (module.hot) {
  module.hot.accept('./components/App/index', () => {
    // eslint-disable-next-line global-require
    const UpdatedApp = require('./components/App/index').default;

    renderRoot(
      <Provider store={store}>
        <UpdatedApp />
      </Provider>,
    );
  });

  module.hot.accept('./reducers.index', () => {
    // eslint-disable-next-line global-require
    const updatedReducer = require('./reducers.index').default;

    store.replaceReducer(updatedReducer);
  });
}

renderRoot(
  <Provider store={store}>
    <App />
  </Provider>,
);

function renderRoot(component) {
  // Only if document is available; skip during static builds.
  if (typeof document !== 'undefined') {
    // $FlowFixMe
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

    // $FlowFixMe
    renderMethod(component, document.getElementById('root'));
  }
}

// Export top level component for static rendering.
export default App;
