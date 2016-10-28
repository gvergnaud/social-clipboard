import fs from 'fs'
import path from 'path'
import { last, head } from 'lodash/fp'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { emitTextCopy, textCopy$, emitFileStream, fileStream$ } from '../../services/Socket'
import * as Notification from '../../services/Notification'
import * as Clipboard from '../../services/Clipboard'
import { createProgressHandler } from '../../utils/nodeStreams'
import { fsPromise } from '../../utils/files'
import { lastCopySelector, isTextCopy, isFileCopy, } from '../modules/history'
import { SEND_CLIPBOARD_CONTENT, COPY_TO_CLIPBOARD, receiveText, receiveFile } from '../actions'
import { noopAction } from '../../utils/moduleHelpers'
import { downloadsFolderPath, createDownloadFolderIfDoesntExist } from '../../utils/files'

const receiveTextEpic = () =>
  textCopy$
    .do(([ data ]) => Notification.newTextCopy(data))
    .map(([ data ]) => receiveText(data))

const receiveFileEpic = () =>
  fileStream$
    .do(createDownloadFolderIfDoesntExist)
    .flatMap(([ stream, { name, size } ]) =>
      Observable.fromPromise(new Promise((resolve, reject) => {
        const filePath = path.join(downloadsFolderPath, name)
        const { progress, percent$ } = createProgressHandler(size)

        stream
          .pipe(progress)
          .pipe(fs.createWriteStream(filePath))
          .on('close', () => resolve({ filePath, name }))
          .on('error', err => reject(err))

        percent$.forEach(percentage => {
          Notification.receiveFileProgress({ name, percentage })
        })
      })
    ))
    .do(({ filePath, name }) => Notification.newFile(name))
    .map(({ filePath, name }) => receiveFile(filePath, name))

const sendTextEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => !Clipboard.isFile())
    .map(() => Clipboard.readText())
    .do(text => emitTextCopy(text))
    .do(text => Notification.textCopySent(text))
    .mapTo(noopAction())

const sendFileEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => Clipboard.isFile())
    .flatMap(() =>
      Observable.fromPromise(
        Clipboard.getFilePaths()
          .then(head)
          .then(filePath =>
            fsPromise.fileStat(filePath)
              .then(stat => ({
                filePath,
                size: stat.size,
                name: last(filePath.split(path.sep)),
              }))
          )
          .then(({ name, filePath, size }) =>
            new Promise((resolve, reject) => {
              const { progress, percent$ } = createProgressHandler(size)

              fs.createReadStream(filePath)
                .pipe(progress)
                .pipe(emitFileStream({ name, size }))
                .on('error', err => reject(err))

              percent$.subscribe({
                complete: () => resolve(name),
                next: percentage => Notification.sendFileProgress({ name, percentage }),
                error: reject,
              })
            })
          )
        )
    )
    .do(name => Notification.fileSent(name))
    .mapTo(noopAction())


const copyTextEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(() => lastCopySelector(store.getState()))
    .filter(copy => isTextCopy(copy))
    .do(copy => Clipboard.writeText(copy.text))
    .mapTo(noopAction())


const copyFileEpic = action$ =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(() => lastCopySelector(store.getState()))
    .filter(copy => isFileCopy(copy))
    .do(copy => Clipboard.writeFileWithPath(copy.filePath))
    .mapTo(noopAction())

export default combineEpics(
  sendTextEpic,
  sendFileEpic,
  copyTextEpic,
  copyFileEpic,
  receiveTextEpic,
  receiveFileEpic
)
