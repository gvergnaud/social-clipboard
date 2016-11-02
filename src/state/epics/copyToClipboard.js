import { combineEpics } from 'redux-observable'
import { COPY_TO_CLIPBOARD } from '../actions/inboxActions'
import { inboxItemSelector } from '../modules/inbox'
import * as Clipboard from '../../services/Clipboard'
import { noopAction } from '../../utils/moduleHelpers'
import { isFileCopy, isTextCopy, extract } from '../../utils/copy'


const copyFileEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(action => inboxItemSelector(action.payload.id, store.getState()))
    .filter(copy => isFileCopy(copy))
    .map(extract)
    .do(copy => Clipboard.writeFileWithPath(copy.filePath))
    .mapTo(noopAction())


const copyTextEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(action => inboxItemSelector(action.payload.id, store.getState()))
    .filter(copy => isTextCopy(copy))
    .map(extract)
    .do(copy => Clipboard.writeText(copy.text))
    .mapTo(noopAction())

export default combineEpics(
  copyFileEpic,
  copyTextEpic
)
