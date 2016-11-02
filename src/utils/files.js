import fs from 'fs'
import path from 'path'
import promisify from 'es6-promisify'

export const downloadsFolderPath =
  path.join(process.env.HOME, 'Downloads', 'Clipboard')

export const createDownloadFolderIfDoesntExist = () => {
  const exists = fs.existsSync(downloadsFolderPath)
  if (!exists) fs.mkdirSync(downloadsFolderPath)
}

export const fsStat = promisify(fs.stat)
