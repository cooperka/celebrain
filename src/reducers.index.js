import { combineReducers } from 'redux';

import { gameReducer } from './components/Game/reducers';
import { memorizeReducer } from './components/Game/Memorize/reducers';

const rootReducer = combineReducers({
  game: gameReducer,
  memorize: memorizeReducer,
});

export default rootReducer;
