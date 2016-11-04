import { combineEpics } from 'redux-observable'
import clipboard from './clipboard'
import socket from './socket'
import notifications from './notifications'

export default combineEpics(
  clipboard,
  socket,
  notifications
)
