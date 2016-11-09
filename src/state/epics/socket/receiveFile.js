import fs from 'fs'
import path from 'path'
import shortId from 'shortid'
import { Observable } from 'rxjs'
import { last, dropRight } from 'lodash/fp'
import { fileStream$ } from '../../../services/Socket'
import { downloadsFolderPath, createDownloadFolderIfDoesntExist } from '../../../utils/files'
import { createFileCopy } from '../../../utils/copy'
import { createProgressHandler } from '../../../utils/nodeStreams'
import { create, update } from '../../actions/inboxActions'
import { start, progress, success, error } from '../../actions/fileActions'
import { notifyReceiveFileSuccess, notifyReceiveFileProgress } from '../../actions/notificationActions'
import { copyToClipboard } from '../../actions/clipboardActions'


const startFileDownloadAction = (id, filePath, name) => create(id, createFileCopy(start(filePath, name)))
const fileDownloadProgressAction = (id, percent) => update(id, createFileCopy(progress(percent)))
const fileDownloadSuccessAction = id => update(id, createFileCopy(success()))
const fileDownloadErrorAction = (id, err) => update(id, createFileCopy(error(err)))


const createFileActionsObservable = (stream, { name, size }) => new Observable(observer => {
  const extension = last(name.split('.'))
  const nameWithoutExtension = dropRight(1, name.split('.')).join('')
  const filePath =
    fs.existsSync(path.join(downloadsFolderPath, name))
      ? path.join(downloadsFolderPath, `${nameWithoutExtension}_1.${extension}`)
      : path.join(downloadsFolderPath, name)

  const { progress: progressTransform, percent$ } = createProgressHandler(size)
  const copyId = shortId.generate()

  observer.next(startFileDownloadAction(copyId, filePath, name))

  stream
    .pipe(progressTransform)
    .pipe(fs.createWriteStream(filePath))
    .on('finish', () => {
      observer.next(fileDownloadSuccessAction(copyId))
      observer.next(notifyReceiveFileSuccess(name))
      observer.next(copyToClipboard(copyId))
      observer.complete()
    })
    .on('error', err => {
      console.log('receiveFile error', err)
      observer.next(fileDownloadErrorAction(copyId, err))
      observer.complete()
    })

  const percentSub = percent$.subscribe({
    next: percentage => {
      observer.next(fileDownloadProgressAction(copyId, percentage))
      observer.next(notifyReceiveFileProgress(name, percentage))
    }
  })

  return {
    unsubscribe: () => {
      percentSub.unsubscribe()
    }
  }
})

const receiveFileEpic = () =>
  fileStream$
    .do(createDownloadFolderIfDoesntExist)
    .flatMap(([ stream, { name, size } ]) => createFileActionsObservable(stream, { name, size }))
    .catch(err => console.log('receiveFileEpic error ', err))


export default receiveFileEpic
