import { createReducer, composeTransformations } from '../../utils/moduleHelpers'
import { set, over, lensProp } from '../../utils/lens'
import { log } from '../../utils/debug'
import { SEND_CLIPBOARD_CONTENT, COPY_TO_CLIPBOARD, RECEIVE, Copy } from '../actions'

/* ----------------------------------------- *
        Reducer
* ----------------------------------------- */

const initialState = {
  last: {},
  history: []
}

const updateLast = (state, action) =>
  set(lensProp('last'), action.payload, state)

const appendHistory = (state, action) =>
  over(lensProp('history'), xs => xs.concat(action.payload), state)

export default createReducer(initialState, {
  [RECEIVE]: composeTransformations(updateLast, appendHistory)
})

/* ----------------------------------------- *
        Selectors
* ----------------------------------------- */

export const lastCopySelector = state => state.history.last

export const historySelector = state => state.history.history

export const isTextCopy = copy => copy.type === Copy.Text

export const isFileCopy = copy => copy.type === Copy.File
