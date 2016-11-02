import path from 'path'
import { Observable } from 'rxjs'
import { last, head, compose } from 'lodash/fp'
import * as Clipboard from '../../services/Clipboard'
import { Copy, createFileCopy, createTextCopy, cata, extract } from '../../utils/copy'
import { fsStat } from '../../utils/files'
import { CLIPBOARD_CHANGED } from '../actions/globalShortcutAction'
import { updateCurrentClipboard } from '../actions/currentClipboard'

const clipboardChanged = action$ =>
  action$.ofType(CLIPBOARD_CHANGED)
    .map(() => Clipboard.isFile() ? createFileCopy() : createTextCopy())
    .flatMap(compose(extract, cata({

      [Copy.File]: () =>
        Observable
          .fromPromise(Clipboard.getFilePaths())
          .map(head)
          .flatMap(filePath =>
            Observable
              .fromPromise(fsStat(filePath))
              .map(stat => ({ filePath, stat }))
          )
          .map(({ filePath, stat }) => ({
            filePath,
            size: stat.size,
            name: last(filePath.split(path.sep)),
          }))
          .map(createFileCopy),

      [Copy.Text]: () =>
        Observable
          .of(Clipboard.readText())
          .map(text => ({ text }))
          .map(createTextCopy)

    })))
    .map(updateCurrentClipboard)

export default clipboardChanged
