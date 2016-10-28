import values from 'lodash/fp/values'
import { createReducer, composeMutations } from '../../utils/moduleHelpers'
import { set, over, lensProps } from '../../utils/lens'
import { extract, cata } from '../../utils/actions'
import { CREATE, UPDATE, REMOVE, Copy } from '../actions/historyActions'
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

const updateCopy = (state, action) => cata({
  [Copy.File]: copyAction => fileReducer(state, copyAction),
  [Copy.Text]: copyAction => textReducer(state, copyAction),
}, action)

const updateHistory = (state, action) => over(
  lensProps('history', action.payload.id),
  copyState => updateCopy(copyState, action.payload.data),
  state
)

const removeCopy = (state, action) =>
  set(lensProps('history', action.payload.id), undefined, state)

export default createReducer(initialState, {
  [CREATE]: composeMutations(updateLastId, updateHistory),
  [UPDATE]: composeMutations(updateHistory),
  [REMOVE]: removeCopy,
})

/* ----------------------------------------- *
        Selectors
* ----------------------------------------- */

export const lastCopySelector = state => state.history.history[state.history.lastId]

export const historySelector = state => values(state.history.history)

export const isTextCopy = copy => copy.type === Copy.Text

export const isFileCopy = copy => copy.type === Copy.File
