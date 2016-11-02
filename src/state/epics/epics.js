import { combineEpics } from 'redux-observable'
import sendTextEpic from './sendText'
import sendFileEpic from './sendFile'
import copyLastTextEpic from './copyLastText'
import copyLastFileEpic from './copyLastFile'
import receiveTextEpic from './receiveText'
import receiveFileEpic from './receiveFile'
import clipboardChangedEpic from './clipboardChanged'
import copyToClipboardEpic from './copyToClipboard'

export default combineEpics(
  sendTextEpic,
  sendFileEpic,
  copyLastTextEpic,
  copyLastFileEpic,
  receiveTextEpic,
  receiveFileEpic,
  clipboardChangedEpic,
  copyToClipboardEpic
)
