export const SEND_CLIPBOARD_CONTENT = 'global.SEND_CLIPBOARD_CONTENT'
export const COPY_TO_CLIPBOARD = 'global.COPY_TO_CLIPBOARD'
export const CLIPBOARD_CHANGED = 'global.CLIPBOARD_CHANGED'

/* ----------------------------------------- *
        Actions
* ----------------------------------------- */

export const sendClipboardContent = () => ({
  type: SEND_CLIPBOARD_CONTENT
})

export const copyToClipboard = () => ({
  type: COPY_TO_CLIPBOARD
})

export const clipboardChanged = () => ({
  type: CLIPBOARD_CHANGED
})
