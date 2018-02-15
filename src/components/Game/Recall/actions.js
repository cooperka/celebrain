// --- Action types

export const actionTypes = {
  RECALL_NEXT: 'RECALL_NEXT',
};

// --- Action creators

export function next() {
  return { type: actionTypes.RECALL_NEXT };
}
