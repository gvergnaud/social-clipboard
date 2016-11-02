import fs from 'fs'
import path from 'path'
import shortId from 'shortid'
import { Observable } from 'rxjs'
import { fileStream$ } from '../../services/Socket'
import { downloadsFolderPath, createDownloadFolderIfDoesntExist } from '../../utils/files'
import { createFileCopy } from '../../utils/copy'
import { createProgressHandler } from '../../utils/nodeStreams'
import { create, update } from '../actions/inboxActions'
import { start, progress, success, error } from '../actions/fileActions'


const startFileDownloadAction = (id, filePath, name) => create(id, createFileCopy(start(filePath, name)))
const fileDownloadProgressAction = (id, percent) => update(id, createFileCopy(progress(percent)))
const fileDownloadSuccessAction = id => update(id, createFileCopy(success()))
const fileDownloadErrorAction = (id, err) => update(id, createFileCopy(error(err)))


const createFileActionsObservable = (stream, { name, size }) => new Observable(observer => {
  let isActive = true

  const filePath = path.join(downloadsFolderPath, name)
  const { progress: progressTransform, percent$ } = createProgressHandler(size)
  const copyId = shortId.generate()

  const next = x => {
    if (isActive) observer.next(x)
  }

  next(startFileDownloadAction(copyId, filePath, name))

  stream
    .pipe(progressTransform)
    .pipe(fs.createWriteStream(filePath))
    .on('finish', () => {
      next(fileDownloadSuccessAction(copyId))
      observer.complete()
    })
    .on('error', err => {
      next(fileDownloadErrorAction(copyId, err))
      observer.complete()
    })

  const percentSub = percent$.subscribe({
    next: percentage => {
      next(fileDownloadProgressAction(copyId, percentage))
    }
  })

  return {
    unsubscribe: () => {
      isActive = false
      percentSub.unsubscribe()
    }
  }
})

const receiveFileEpic = () =>
  fileStream$
    .do(createDownloadFolderIfDoesntExist)
    .flatMap(([ stream, { name, size } ]) => createFileActionsObservable(stream, { name, size }))


export default receiveFileEpic
