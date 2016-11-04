import { combineEpics } from 'redux-observable'
import receiveFile from './receiveFile'
import receiveText from './receiveText'
import sendFile from './sendFile'
import sendText from './sendText'


export default combineEpics(
  receiveFile,
  receiveText,
  sendFile,
  sendText
)
