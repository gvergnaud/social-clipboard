export const CREATE = 'history.CREATE'
export const UPDATE = 'history.UPDATE'
export const REMOVE = 'history.REMOVE'
export const Copy = {
  Text: 'Copy.Text',
  File: 'Copy.File',
}

export const create = (id, data) => ({
  type: CREATE,
  payload: { id, data }
})

export const update = (id, data) => ({
  type: UPDATE,
  payload: { id, data }
})

export const remove = (id) => ({
  type: REMOVE,
  payload: { id }
})

export const file = action => ({
  type: Copy.File,
  payload: action
})

export const text = action => ({
  type: Copy.Text,
  payload: action
})
