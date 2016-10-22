import { createReducer, composeTransformations } from '../../utils/moduleHelpers'
import { set, over, lensProp } from '../../utils/lens'
import { log } from '../../utils/debug'

/* ----------------------------------------- *
        Types
* ----------------------------------------- */

export const SEND_CLIPBOARD_CONTENT = 'SEND_CLIPBOARD_CONTENT'
export const COPY_TO_CLIPBOARD = 'COPY_TO_CLIPBOARD'
export const RECEIVE = 'RECEIVE'

export const Copy = {
  Text: 'Copy.Text',
  File: 'Copy.File',
}

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
  over(lensProp('history'), xs => log('xs', xs).concat(action.payload), log('state', state))

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

/* ----------------------------------------- *
        Actions
* ----------------------------------------- */

export const sendClipboardContent = () => ({
  type: SEND_CLIPBOARD_CONTENT
})

export const copyToClipboard = () => ({
  type: COPY_TO_CLIPBOARD
})

export const receiveText = text => ({
  type: RECEIVE,
  payload: {
    type: Copy.Text,
    text
  }
})

export const receiveFile = (filePath, name) => ({
  type: RECEIVE,
  payload: {
    type: Copy.File,
    filePath,
    name
  }
})
