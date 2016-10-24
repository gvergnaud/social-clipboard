import { Subject } from 'rxjs'
import { globalShortcut } from 'electron'
import MenuBar from 'menubar'
import { sendClipboardContent, copyToClipboard } from './state/actions'
import * as Clipboard from './services/Clipboard'
import configureStore from './state/configureStore'

require('electron-debug')({ showDevTools: true, enabled: true })

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

  // Clipboard.onClipboardChange(() => {
  //   if (Clipboard.isFile()) {
  //     Clipboard.getFilePaths().then(console.log)
  //   } else {
  //     console.log('clipboard', Clipboard.readText())
  //   }
  // })
})

menuBar.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
