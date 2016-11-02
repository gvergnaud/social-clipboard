import { combineEpics } from 'redux-observable'
import sendTextEpic from './sendText'
import sendFileEpic from './sendFile'
import copyLastToClipboardEpic from './copyLastToClipboard'
import receiveTextEpic from './receiveText'
import receiveFileEpic from './receiveFile'
import clipboardChangedEpic from './clipboardChanged'
import copyToClipboardEpic from './copyToClipboard'

export default combineEpics(
  sendTextEpic,
  sendFileEpic,
  copyLastToClipboardEpic,
  receiveTextEpic,
  receiveFileEpic,
  clipboardChangedEpic,
  copyToClipboardEpic
)
