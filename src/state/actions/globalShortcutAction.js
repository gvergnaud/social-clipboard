export const SEND_CLIPBOARD_CONTENT = 'global.SEND_CLIPBOARD_CONTENT'
export const COPY_TO_CLIPBOARD = 'global.COPY_TO_CLIPBOARD'

/* ----------------------------------------- *
        Actions
* ----------------------------------------- */

export const sendClipboardContent = () => ({
  type: SEND_CLIPBOARD_CONTENT
})

export const copyToClipboard = () => ({
  type: COPY_TO_CLIPBOARD
})
