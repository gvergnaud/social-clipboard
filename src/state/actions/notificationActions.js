export const NOTIFY_FILE_PROGRESS = 'notification.NOTIFY_FILE_PROGRESS'
export const NOTIFY_FILE_SUCCESS = 'notification.NOTIFY_FILE_SUCCESS'

export const notifyFileProgress = (name, percent) => ({
  type: NOTIFY_FILE_PROGRESS,
  payload: { name, percent }
})

export const notifyFileSuccess = name => ({
  type: NOTIFY_FILE_SUCCESS,
  payload: { name }
})
