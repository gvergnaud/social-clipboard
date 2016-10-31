import { Copy } from '../../utils/copy'

export const CREATE = 'history.CREATE'
export const UPDATE = 'history.UPDATE'
export const REMOVE = 'history.REMOVE'

export const create = (id, copy) => ({
  type: CREATE,
  payload: { id, copy }
})

export const update = (id, copy) => ({
  type: UPDATE,
  payload: { id, copy }
})

export const remove = (id) => ({
  type: REMOVE,
  payload: { id }
})
