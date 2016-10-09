import { Menu, globalShortcut, clipboard, webContents, ipcMain, ipcRender } from 'electron'
import MenuBar from 'menubar'
import path from 'path'
import { wait } from './utils/promises'
import * as Socket from './services/Socket'
import * as Notification from './services/Notification'


const menuBar = MenuBar({ tooltip: 'clipboard' })

const doSomething = {
  label: 'Do something',
  type: 'normal',
  click: () => wait(500)
}

const quit = { label: 'Quit', type: 'normal', role: 'quit' }


const onClipboardChanged = f => {
  let prevValue = clipboard.readText()
  const interval = setInterval(() => {
    const value = clipboard.readText()
    if (value !== prevValue) {
      prevValue = value
      f(value)
    }
  }, 200)
  return () => clearInteval(interval)
}


menuBar.on('ready', () => {

  let lastCopy = ''

  Socket.copy$.forEach(data => {
    lastCopy = data
    Notification.newCopy(data)
  })

  globalShortcut.register('CommandOrControl+Shift+V', () => {
    Socket.emitCopy(clipboard.readText('selection'))
  })

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    clipboard.writeText(lastCopy)
  })

  onClipboardChanged(x => console.log(x))

  menuBar.tray.setContextMenu(
    Menu.buildFromTemplate([
      doSomething,
      { type: 'separator' },
      { role: 'paste' },
      quit,
    ])
  )
})


menuBar.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
