import fs from 'fs'
import path from 'path'
import promisify from 'es6-promisify'
import { Observable } from 'rxjs'
import { last, head } from 'lodash/fp'
import { noopAction } from '../../utils/moduleHelpers'
import { createProgressHandler } from '../../utils/nodeStreams'
import * as Clipboard from '../../services/Clipboard'
import * as Notification from '../../services/Notification'
import { emitFileStream } from '../../services/Socket'
import { SEND_CLIPBOARD_CONTENT } from '../actions/globalShortcutAction'

const sendFileEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => Clipboard.isFile())
    .flatMap(() =>
      Observable.fromPromise(
        Clipboard.getFilePaths()
          .then(head)
          .then(filePath =>
            promisify(fs.stat)(filePath)
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


export default sendFileEpic
