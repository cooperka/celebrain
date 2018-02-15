import { actionTypes } from './actions';

const initialState = {
  isActive: false,
};

export function gameReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TOGGLE_GAME_STATE:
      return {
        ...state,
        isActive: !state.isActive,
      };

    default:
      return state;
  }
}
