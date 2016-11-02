import { createReducer } from '../../utils/moduleHelpers'
import { createNothingCopy } from '../../utils/copy'
import { UPDATE } from '../actions/currentClipboard'

/* ----------------------------------------- *
        Reducer
* ----------------------------------------- */

const initialState = createNothingCopy()

const update = (state, action) => action.payload.copy

export default createReducer(initialState, {
  [UPDATE]: update
})

export const currentClipboardSelector = state => state.currentClipboard
