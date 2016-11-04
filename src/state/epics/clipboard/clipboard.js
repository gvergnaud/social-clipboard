import { combineEpics } from 'redux-observable'
import clipboardChanged from './clipboardChanged'
import copyToClipboard from './copyToClipboard'
import copyLastToClipboard from './copyLastToClipboard'


export default combineEpics(
  clipboardChanged,
  copyToClipboard,
  copyLastToClipboard
)
