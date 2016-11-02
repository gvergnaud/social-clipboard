import { combineEpics } from 'redux-observable'
import sendTextEpic from './sendText'
import sendFileEpic from './sendFile'
import copyTextEpic from './copyText'
import copyFileEpic from './copyFile'
import receiveTextEpic from './receiveText'
import receiveFileEpic from './receiveFile'
import clipboardChangedEpic from './clipboardChanged'

export default combineEpics(
  sendTextEpic,
  sendFileEpic,
  copyTextEpic,
  copyFileEpic,
  receiveTextEpic,
  receiveFileEpic,
  clipboardChangedEpic
)
