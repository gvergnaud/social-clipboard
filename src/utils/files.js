import fs from 'fs'
import promisifyAll from 'es6-promisify-all'
import path from 'path'

export const fsPromise = promisifyAll(fs)

export const downloadsFolderPath =
  path.join(process.env.HOME, 'Downloads', 'Clipboard')

export const createDownloadFolderIfDoesntExist = () => {
  const exists = fs.existsSync(downloadsFolderPath)
  if (!exists) fs.mkdirSync(downloadsFolderPath)
}
