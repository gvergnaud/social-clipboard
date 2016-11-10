import { combineEpics } from 'redux-observable'
import { prop } from 'lodash/fp'
import * as Notification from '../../services/Notification'
import {
  NOTIFY_RECEIVE_FILE_PROGRESS,
  NOTIFY_RECEIVE_FILE_SUCCESS,
  NOTIFY_SEND_FILE_PROGRESS,
  NOTIFY_SEND_FILE_SUCCESS,
  NOTIFY_TEXT_RECEIVED,
  NOTIFY_TEXT_SENT,
} from '../actions/notificationActions'


const floorPercent = ({ percent, ...rest }) => ({
  ...rest,
  percent: Math.floor(percent / 10) * 10
})

const arePercentEquals = (a, b) => a.percent === b.percent

const fileDownloadProgress = action$ =>
  action$.ofType(NOTIFY_RECEIVE_FILE_PROGRESS)
    .map(prop('payload'))
    .map(floorPercent)
    .distinctUntilChanged(arePercentEquals)
    .do(Notification.receiveFileProgress)
    .filter(() => false)

const fileDownloadSuccess = action$ =>
  action$.ofType(NOTIFY_RECEIVE_FILE_SUCCESS)
    .map(prop('payload'))
    .do(({ name }) => Notification.receiveFileSuccess(name))
    .filter(() => false)

const fileSendProgress = action$ =>
  action$.ofType(NOTIFY_SEND_FILE_PROGRESS)
    .map(prop('payload'))
    .map(floorPercent)
    .distinctUntilChanged(arePercentEquals)
    .do(Notification.sendFileProgress)
    .filter(() => false)

const fileSendSuccess = action$ =>
  action$.ofType(NOTIFY_SEND_FILE_SUCCESS)
    .map(prop('payload'))
    .do(({ name }) => Notification.sendFileSuccess(name))
    .filter(() => false)

const receiveText = action$ =>
  action$.ofType(NOTIFY_TEXT_RECEIVED)
    .map(prop('payload'))
    .do(({ text }) => Notification.receiveText(text))
    .filter(() => false)

const sendText = action$ =>
  action$.ofType(NOTIFY_TEXT_SENT)
    .map(prop('payload'))
    .do(({ text }) => Notification.textSent(text))
    .filter(() => false)

export default combineEpics(
  fileDownloadProgress,
  fileDownloadSuccess,
  fileSendProgress,
  fileSendSuccess,
  receiveText,
  sendText
)
