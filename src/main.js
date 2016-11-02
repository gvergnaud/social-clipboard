import { globalShortcut } from 'electron'
import MenuBar from 'menubar'
import { sendClipboardContent, copyToClipboard, clipboardChanged } from './state/actions/globalShortcutAction'
import configureStore from './state/configureStore'
import * as Clipboard from './services/Clipboard'

require('electron-debug')({ showDevTools: false })

global.store = configureStore()

const menuBar = MenuBar({
  tooltip: 'clipboard',
  index: `file://${__dirname}/app/app.html`,
  width: 350,
  height: 450,
  alwaysOnTop: true,
  preloadWindow: true,
  showOnAllWorkspaces: false,
  transparent: true,
  frame: false
})

menuBar.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+V', () => {
    global.store.dispatch(sendClipboardContent())
  })

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    global.store.dispatch(copyToClipboard())
  })

  Clipboard.onClipboardChange(() => {
    global.store.dispatch(clipboardChanged())
  })
})

menuBar.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
