import fs from 'fs'
import path from 'path'
import { Menu, globalShortcut, webContents, ipcMain, ipcRender } from 'electron'
import MenuBar from 'menubar'
import { map, last, head } from 'lodash/fp'
import fsPromise from 'fs-promise'
import Progress from 'progress-stream'
import { wait } from './utils/promises'
import { emitTextCopy, textCopy$, emitFileStream, fileStream$ }  from './services/Socket'
import * as Notification from './services/Notification'
import * as Clipboard from './services/Clipboard'
import { log } from './utils/debug'
import { createPercentObservable } from './utils/files'

const menuBar = MenuBar({ tooltip: 'clipboard' })

menuBar.on('ready', () => {

  let lastCopy = {}

  const Copy = {
    Text: 'Copy.Text',
    File: 'Copy.File',
  }

  textCopy$
    .forEach(([ data ]) => {
      lastCopy = {
        type: Copy.Text,
        data
      }
      Notification.newTextCopy(data)
    })

  fileStream$
    .forEach(([ stream, { name, size } ]) => {
      const filePath = path.resolve('files', name)
      const progress = Progress({ length: size, time: 100 })

      stream
        .pipe(progress)
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => {
          lastCopy = {
            type: Copy.File,
            filePath,
            name,
          }
          Notification.newFile(name)
        })
        .on('error', err => {
          console.log('file receiving stopped', err)
        })

      createPercentObservable(progress)
        .forEach(percentage => {
          Notification.receiveFileProgress({ name, percentage })
        })
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
        .then(filePath =>
          fsPromise.stat(filePath)
            .then(stat => ({
              filePath,
              size: stat.size,
              name: last(filePath.split(path.sep)),
            }))
        )
        .then(({ name, filePath, size }) => {
          const progress = Progress({ length: size, time: 100 })

          fs.createReadStream(filePath)
            .pipe(progress)
            .pipe(emitFileStream({ name, size }))
            .on('error', err => {
              console.log('file sending stopped', err)
            })

          createPercentObservable(progress)
            .subscribe({
              complete: () => Notification.fileSent(name),
              next: percentage => Notification.sendFileProgress({ name, percentage }),
              error: err => console.log('Progress error :', err),
            })

        })
        .catch(err => console.error(err))

    } else {

      const text = Clipboard.readText()
      emitTextCopy(text)
      Notification.textCopySent(text)
    }

  })

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    switch (lastCopy.type) {
      case Copy.Text:
        Clipboard.writeText(lastCopy.data)
        break
      case Copy.File:
        Clipboard.writeFileWithPath(lastCopy.filePath)
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
