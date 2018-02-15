// --- Action types

export const actionTypes = {
  TOGGLE_GAME_STATE: 'TOGGLE_GAME_STATE',
  RESTART: 'RESTART',
};

// --- Action creators

export function setGameState(state) {
  return { type: actionTypes.TOGGLE_GAME_STATE, payload: { state } };
}

export function restart() {
  return { type: actionTypes.RESTART };
}
