export const COPY_LAST_TO_CLIPBOARD = 'global.COPY_LAST_TO_CLIPBOARD'
export const COPY_TO_CLIPBOARD = 'inbox.COPY_TO_CLIPBOARD'
export const CLIPBOARD_CHANGED = 'global.CLIPBOARD_CHANGED'

/* ----------------------------------------- *
        Actions
* ----------------------------------------- */

export const copyLastToClipboard = () => ({
  type: COPY_LAST_TO_CLIPBOARD
})

export const copyToClipboard = id => ({
  type: COPY_TO_CLIPBOARD,
  payload: { id }
})

export const clipboardChanged = () => ({
  type: CLIPBOARD_CHANGED
})
