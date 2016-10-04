import { Menu, globalShortcut, clipboard } from 'electron'
import MenuBar from 'menubar'
import path from 'path'
import { wait } from './utils/promises'


const menuBar = MenuBar({ tooltip: 'clipboard' })

const doSomething = {
  label: 'Do something',
  type: 'normal',
  click: () => wait(500)
}

const quit = { label: 'Quit', type: 'normal', role: 'quit' }



menuBar.on('ready', () => {
  const ret = globalShortcut.register('CommandOrControl+Shift+C', () => {
    // console.log(clipboard.availableFormats())
    console.log(clipboard.readText())
    // console.log(clipboard.readImage())
    // console.log('CommandOrControl+Shift+C is pressed')
  })

  if (!ret) console.log('registration failed')

  console.log(globalShortcut.isRegistered('CommandOrControl+Shift+C'))


  menuBar.tray.setContextMenu(
    Menu.buildFromTemplate([
      doSomething,
      { type: 'separator' },
      quit,
    ])
  )
})


menuBar.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+Shift+C')
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
