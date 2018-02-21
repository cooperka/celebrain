// --- Action types

export const actionTypes = {
  TOGGLE_GAME_STATE: 'TOGGLE_GAME_STATE',
  RESTART: 'RESTART',

  SET_ONLY_FIRST_NAMES: 'SET_ONLY_FIRST_NAMES',
};

// --- Action creators

export function setGameState(state) {
  return { type: actionTypes.TOGGLE_GAME_STATE, payload: { state } };
}

export function restart() {
  return { type: actionTypes.RESTART };
}

// --- Settings

export function setOnlyFirstNames(isChecked) {
  return { type: actionTypes.SET_ONLY_FIRST_NAMES, payload: { isChecked } };
}
