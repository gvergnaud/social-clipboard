import values from 'lodash/fp/values'
import { createReducer, composeMutations } from '../../../utils/moduleHelpers'
import { set, over, lensProps } from '../../../utils/lens'
import { Copy, extract, cata } from '../../../utils/copy'
import { CREATE, UPDATE, REMOVE } from '../../actions/inboxActions'
import textReducer from './text'
import fileReducer from './file'

/* ----------------------------------------- *
        Reducer
* ----------------------------------------- */

const initialState = {
  lastId: '',
  history: {},
}

const updateLastId = (state, action) =>
  set(lensProps('lastId'), action.payload.id, state)

const updateCopy = (state, copy) => cata({
  [Copy.File]: copyAction => fileReducer(state, copyAction),
  [Copy.Text]: copyAction => textReducer(state, copyAction),
}, copy)

const createHistoryEntry = (state, action) => set(
  lensProps('history', action.payload.id),
  updateCopy(undefined, action.payload.copy),
  state
)

const updateHistoryEntry = (state, action) => over(
  lensProps('history', action.payload.id),
  copyState => updateCopy(extract(copyState), action.payload.copy),
  state
)

const removeCopy = (state, action) =>
  set(lensProps('history', action.payload.id), undefined, state)

export default createReducer(initialState, {
  [CREATE]: composeMutations(updateLastId, createHistoryEntry),
  [UPDATE]: composeMutations(updateHistoryEntry),
  [REMOVE]: removeCopy,
})

/* ----------------------------------------- *
        Selectors
* ----------------------------------------- */

export const inboxLastSelector = state => state.inbox.history[state.inbox.lastId]

export const inboxHistorySelector = state => values(state.inbox.history)
