/* ----------------------------------------- *
        Types
* ----------------------------------------- */

export const SEND_CLIPBOARD_CONTENT = 'SEND_CLIPBOARD_CONTENT'
export const COPY_TO_CLIPBOARD = 'COPY_TO_CLIPBOARD'
export const RECEIVE = 'RECEIVE'

export const Copy = {
  Text: 'Copy.Text',
  File: 'Copy.File',
}

/* ----------------------------------------- *
        Actions
* ----------------------------------------- */

export const sendClipboardContent = () => ({
  type: SEND_CLIPBOARD_CONTENT
})

export const copyToClipboard = () => ({
  type: COPY_TO_CLIPBOARD
})

export const receiveText = text => ({
  type: RECEIVE,
  payload: {
    type: Copy.Text,
    payload: {
      text
    }
  }
})

export const receiveFile = (filePath, name) => ({
  type: RECEIVE,
  payload: {
    type: Copy.File,
    payload: {
      filePath,
      name
    }
  }
})
