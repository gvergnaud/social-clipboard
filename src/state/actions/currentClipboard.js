export const UPDATE = 'currentClipboard.UPDATE'

export const updateCurrentClipboard = copy => ({
  type: UPDATE,
  payload: { copy }
})
