// --- Action types

export const actionTypes = {
  MEMORIZE_NEXT: 'MEMORIZE_NEXT',
};

// --- Action creators

export function next() {
  return { type: actionTypes.MEMORIZE_NEXT };
}
