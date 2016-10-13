import { Menu, globalShortcut, webContents, ipcMain, ipcRender } from 'electron'
import MenuBar from 'menubar'
import path from 'path'
import { map, last } from 'lodash/fp'
import { wait } from './utils/promises'
import * as Socket from './services/Socket'
import * as Notification from './services/Notification'
import * as Clipboard from './services/Clipboard'
import { readFile, writeFile } from 'fs-promise'
import { log } from './utils/debug'

const menuBar = MenuBar({ tooltip: 'clipboard' })

menuBar.on('ready', () => {

  let lastCopy = ''

  Socket.copy$.forEach(data => {
    lastCopy = data
    Notification.newCopy(data)
  })


  Clipboard.onClipboardChange(() => {
    if (Clipboard.isFile()) {
      Clipboard.getFilePaths()
        .then(map(filePath => {
          const name = last(filePath.split(path.sep))
          return readFile(filePath).then(buffer => ({ name, buffer }))
        }))
        .then(ps => Promise.all(ps))
        .then(map(({ name, buffer }) => writeFile(path.resolve('files', name), buffer)))
        .catch(err => console.error(err))
    } else {
      console.log('clipboard', Clipboard.readText())
    }
  })

  globalShortcut.register('CommandOrControl+Shift+V', () => {
    const copy = Clipboard.readText()
    Notification.sentCopy(copy)
    Socket.emitCopy(copy)
  })

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    Clipboard.writeText(lastCopy)
    // if last copy is a file
    // Clipboard.writeFileWithPath(path.resolve('files', 'Screen Shot 2016-10-11 at 10.56.51 AM.png'))
  })

  menuBar.tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Do something',
        type: 'normal',
        click: () => wait(500)
      },
      { type: 'separator' },
      { role: 'paste' },
      { label: 'Quit', type: 'normal', role: 'quit' },
    ])
  )
})


menuBar.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
