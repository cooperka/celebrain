// --- Action types

export const actionTypes = {
  TOGGLE_GAME_STATE: 'TOGGLE_GAME_STATE',
};

// --- Action creators

export function toggleGameState() {
  return { type: actionTypes.TOGGLE_GAME_STATE };
}
