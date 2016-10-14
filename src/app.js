import { Menu, globalShortcut, webContents, ipcMain, ipcRender } from 'electron'
import MenuBar from 'menubar'
import path from 'path'
import { map, last, head } from 'lodash/fp'
import { wait } from './utils/promises'
import { emitTextCopy, textCopy$, emitFileCopy, fileCopy$ }  from './services/Socket'
import * as Notification from './services/Notification'
import * as Clipboard from './services/Clipboard'
import { readFile, writeFile } from 'fs-promise'
import { log } from './utils/debug'

const menuBar = MenuBar({ tooltip: 'clipboard' })

menuBar.on('ready', () => {

  let lastCopy = {}

  const Copy = {
    Text: 'Copy.Text',
    File: 'Copy.File',
  }

  textCopy$
    .forEach(data => {
      lastCopy = {
        type: Copy.Text,
        data
      }
      Notification.newTextCopy(data)
    })

  fileCopy$
    .forEach(({ name, buffer }) => {
      writeFile(path.resolve('files', name), buffer)
      lastCopy = {
        type: Copy.File,
        path: path.resolve('files', name),
        name,
      }
      Notification.newFileCopy(name)
    })


  Clipboard.onClipboardChange(() => {
    if (Clipboard.isFile()) {
      Clipboard.getFilePaths().then(console.log)
    } else {
      console.log('clipboard', Clipboard.readText())
    }
  })

  globalShortcut.register('CommandOrControl+Shift+V', () => {

    if (Clipboard.isFile()) {

      Clipboard.getFilePaths()
        .then(head)
        .then(filePath => {
          const name = last(filePath.split(path.sep))
          return readFile(filePath).then(buffer => ({ name, buffer }))
        })
        .then(({ name, buffer }) => {
          emitFileCopy({ name, buffer })
          Notification.sentFileCopy(name)
        })
        .catch(err => console.error(err))

    } else {

      const text = Clipboard.readText()
      Notification.sentTextCopy(text)
      emitTextCopy(text)
    }


  })

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    switch (lastCopy.type) {
      case Copy.Text:
        Clipboard.writeText(lastCopy.data)
        break
      case Copy.File:
        Clipboard.writeFileWithPath(lastCopy.path)
        break
    }
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
