import { combineReducers } from 'redux';

import { gameReducer } from './components/Game/reducers';

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
