import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ReduxDevTools from '../components/ReduxDevTools/index';

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

  return store;
}
