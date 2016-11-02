import { combineEpics } from 'redux-observable'
import { COPY_LAST_TO_CLIPBOARD } from '../actions/globalShortcutAction'
import { inboxLastSelector } from '../modules/inbox'
import * as Clipboard from '../../services/Clipboard'
import { noopAction } from '../../utils/moduleHelpers'
import { isFileCopy, isTextCopy, extract } from '../../utils/copy'

const copyLastTextEpic = (action$, store) =>
  action$.ofType(COPY_LAST_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isTextCopy(copy))
    .map(extract)
    .do(copyValue => Clipboard.writeText(copyValue.text))
    .mapTo(noopAction())

const copyLastFileEpic = (action$, store) =>
  action$.ofType(COPY_LAST_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isFileCopy(copy))
    .map(extract)
    .do(copyValue => Clipboard.writeFileWithPath(copyValue.filePath))
    .mapTo(noopAction())


export default combineEpics(
  copyLastTextEpic,
  copyLastFileEpic
)
