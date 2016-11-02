import { combineReducers } from 'redux'
import inbox from './modules/inbox'
import currentClipboard from './modules/currentClipboard'

export default combineReducers({
  inbox,
  currentClipboard
})
