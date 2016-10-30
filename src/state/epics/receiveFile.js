import fs from 'fs'
import path from 'path'
import shortId from 'shortid'
import { Observable } from 'rxjs'
import { fileStream$ } from '../../services/Socket'
import { downloadsFolderPath, createDownloadFolderIfDoesntExist } from '../../utils/files'
import { createProgressHandler } from '../../utils/nodeStreams'
import { create, update, file } from '../actions/historyActions'
import { start, progress, success, error } from '../actions/fileActions'


const startFileDownloadAction = (id, filePath, name) => create(id, file(start(filePath, name)))
const fileDownloadProgressAction = (id, percent) => create(id, file(progress(percent)))
const fileDownloadSuccessAction = id => update(id, file(success()))
const fileDownloadErrorAction = (id, err) => update(id, file(error(err)))


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
    .on('close', () => {
      next(fileDownloadSuccessAction(copyId))
      observer.complete()
    })
    .on('error', err => {
      next(fileDownloadErrorAction(copyId, err))
      observer.complete()
    })

  const percentSub = percent$.subscribe({
    next: percentage => {
      next(fileDownloadProgressAction(percentage))
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
