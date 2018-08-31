import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ReduxDevTools from '../components/ReduxDevTools/component';

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Configure and return a Redux store.
 */
export function configureStore(rootReducer) {
  const middlewareEnhancer = applyMiddleware(thunk);

  const noopEnhancer = (fn) => fn;
  const devToolsEnhancer = IS_DEV ? ReduxDevTools.instrument() : noopEnhancer;

  const storeEnhancer = compose(
    middlewareEnhancer,
    devToolsEnhancer,
  );

  const store = createStore(rootReducer, storeEnhancer);

  configureDebugging(store);

  return store;
}

/**
 * Set some global vars for Chrome console debugging.
 */
function configureDebugging(store) {
  // Only if window is available; skip during static builds.
  if (IS_DEV && typeof window !== 'undefined') {
    window.getState = () => store.getState();
    window.dispatch = store.dispatch;
  }
}
