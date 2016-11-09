import fs from 'fs'
import path from 'path'
import { Observable } from 'rxjs'
import { last, head } from 'lodash/fp'
import { createProgressHandler } from '../../../utils/nodeStreams'
import { fsStat } from '../../../utils/files'
import * as Clipboard from '../../../services/Clipboard'
import { emitFileStream } from '../../../services/Socket'
import { SEND_CLIPBOARD_CONTENT } from '../../actions/socketActions'
import { notifySendFileSuccess, notifySendFileProgress } from '../../actions/notificationActions'

const createSendFileActionsObservable = () => new Observable(observer => {
  Clipboard.getFilePaths()
    .then(head)
    .then(filePath =>
      fsStat(filePath)
        .then(stat => ({
          filePath,
          size: stat.size,
          name: last(filePath.split(path.sep)),
        }))
    )
    .then(({ name, filePath, size }) => {
      const { progress, percent$ } = createProgressHandler(size)

      fs.createReadStream(filePath)
        .pipe(progress)
        .pipe(emitFileStream({ name, size }))
        .on('close', () => {
          observer.next(notifySendFileSuccess(name))
          observer.complete()
        })
        .on('error', () => {
          observer.complete()
        })

      percent$
        .throttleTime(1000)
        .subscribe({
          next: percent => observer.next(notifySendFileProgress(name, percent)),
          error: () => observer.complete(),
        })
    })
})

const sendFileEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => Clipboard.isFile())
    .flatMap(createSendFileActionsObservable)
    .catch(err => console.log('sendFile error : ', err))


export default sendFileEpic
