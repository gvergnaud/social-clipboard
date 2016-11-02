export const CREATE = 'inbox.CREATE'
export const UPDATE = 'inbox.UPDATE'
export const REMOVE = 'inbox.REMOVE'
export const COPY_TO_CLIPBOARD = 'inbox.COPY_TO_CLIPBOARD'

export const create = (id, copy) => ({
  type: CREATE,
  payload: { id, copy }
})

export const update = (id, copy) => ({
  type: UPDATE,
  payload: { id, copy }
})

export const remove = id => ({
  type: REMOVE,
  payload: { id }
})

export const copyToClipboard = id => ({
  type: COPY_TO_CLIPBOARD,
  payload: { id }
})
