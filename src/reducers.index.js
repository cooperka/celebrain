import { combineReducers } from 'redux';

import { gameReducer } from './components/Game/reducers';
import { memorizeReducer } from './components/Game/Memorize/reducers';
import { recallReducer } from './components/Game/Recall/reducers';

const rootReducer = combineReducers({
  game: gameReducer,
  memorize: memorizeReducer,
  recall: recallReducer,
});

export default rootReducer;
