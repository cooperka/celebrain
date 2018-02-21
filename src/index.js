// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import 'typeface-roboto/index.css';

import rootReducer from './reducers.index';
import { configureStore } from './utils/setup-utils';

import App from './components/App';

import './styles.css';

const store = configureStore(rootReducer);

const theme = createMuiTheme({
  // https://material-ui-next.com/customization/themes/#typography
  typography: {
    // Account for base font-size of 62.5%.
    htmlFontSize: 10,
  },
});

// Enable Hot Module Replacement (HMR).
if (module.hot) {
  module.hot.accept('./components/App/index', () => {
    // eslint-disable-next-line global-require
    const UpdatedApp = require('./components/App/index').default;
    renderRoot(UpdatedApp);
  });

  module.hot.accept('./reducers.index', () => {
    // eslint-disable-next-line global-require
    const updatedReducer = require('./reducers.index').default;
    store.replaceReducer(updatedReducer);
  });
}

renderRoot(App);

function renderRoot(AppComponent) {
  // Only if document is available; skip during static builds.
  if (typeof document !== 'undefined') {
    // $FlowFixMe
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

    renderMethod(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <AppComponent />
        </MuiThemeProvider>
      </Provider>,
      // $FlowFixMe
      document.getElementById('root'),
    );
  }
}

// Export top level component for static rendering.
export default App;
