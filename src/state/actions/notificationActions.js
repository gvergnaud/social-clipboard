export const NOTIFY_RECEIVE_FILE_PROGRESS = 'notification.NOTIFY_RECEIVE_FILE_PROGRESS'
export const NOTIFY_RECEIVE_FILE_SUCCESS = 'notification.NOTIFY_RECEIVE_FILE_SUCCESS'
export const NOTIFY_SEND_FILE_PROGRESS = 'notification.NOTIFY_SEND_FILE_PROGRESS'
export const NOTIFY_SEND_FILE_SUCCESS = 'notification.NOTIFY_SEND_FILE_SUCCESS'
export const NOTIFY_TEXT_RECEIVED = 'notification.NOTIFY_TEXT_RECEIVED'
export const NOTIFY_TEXT_SENT = 'notification.NOTIFY_TEXT_SENT'

export const notifyReceiveFileProgress = (name, percent) => ({
  type: NOTIFY_RECEIVE_FILE_PROGRESS,
  payload: { name, percent }
})

export const notifyReceiveFileSuccess = name => ({
  type: NOTIFY_RECEIVE_FILE_SUCCESS,
  payload: { name }
})

export const notifySendFileProgress = (name, percent) => ({
  type: NOTIFY_SEND_FILE_PROGRESS,
  payload: { name, percent }
})

export const notifySendFileSuccess = name => ({
  type: NOTIFY_SEND_FILE_SUCCESS,
  payload: { name }
})

export const notifyTextReceived = text => ({
  type: NOTIFY_TEXT_RECEIVED,
  payload: { text }
})

export const notifyTextSent = text => ({
  type: NOTIFY_TEXT_SENT,
  payload: { text }
})
