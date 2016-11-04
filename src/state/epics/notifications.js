import { combineEpics } from 'redux-observable'
import { prop } from 'lodash/fp'
import * as Notification from '../../services/Notification'
import { noopAction } from '../../utils/moduleHelpers'
import { NOTIFY_FILE_PROGRESS, NOTIFY_FILE_SUCCESS } from '../actions/notificationActions'


const fileDownloadProgress = action$ =>
  action$.ofType(NOTIFY_FILE_PROGRESS)
    .map(prop('payload'))
    .map(({ percent, ...rest }) => ({
      ...rest,
      percent: Math.floor(percent / 10) * 10
    }))
    .distinctUntilChanged((a, b) => a.percent === b.percent)
    .do(({ name, percent }) => Notification.receiveFileProgress({
      name,
      percentage: percent,
    }))
    .mapTo(noopAction())

const fileDownloadSuccess = action$ =>
  action$.ofType(NOTIFY_FILE_SUCCESS)
    .map(prop('payload'))
    .do(({ name }) => Notification.receiveFileSuccess(name))
    .mapTo(noopAction())

export default combineEpics(
  fileDownloadProgress,
  fileDownloadSuccess
)
