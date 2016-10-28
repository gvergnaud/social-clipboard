import { createReducer, composeMutations } from '../../utils/moduleHelpers'
import { set, lensProp } from '../../utils/lens'
import { RECEIVE } from '../actions/textActions'

/* ----------------------------------------- *
        Reducer
* ----------------------------------------- */

const initialState = {
  createdAt: null,
  text: ''
}

const setCreatedAt = state =>
  set(lensProp('createdAt'), Date.now(), state)

const setText = (state, action) =>
  set(lensProp('text'), action.payload.text, state)

export default createReducer(initialState, {
  [RECEIVE]: composeMutations(setCreatedAt, setText)
})
