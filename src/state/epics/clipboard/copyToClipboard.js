import { combineEpics } from 'redux-observable'
import { inboxItemSelector } from '../../modules/inbox'
import * as Clipboard from '../../../services/Clipboard'
import { isFileCopy, isTextCopy, extract } from '../../../utils/copy'
import { COPY_TO_CLIPBOARD } from '../../actions/clipboardActions'


const copyFileEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(action => inboxItemSelector(action.payload.id, store.getState()))
    .filter(copy => isFileCopy(copy))
    .map(extract)
    .do(copy => Clipboard.writeFileWithPath(copy.filePath))
    .filter(() => false)


const copyTextEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(action => inboxItemSelector(action.payload.id, store.getState()))
    .filter(copy => isTextCopy(copy))
    .map(extract)
    .do(copy => Clipboard.writeText(copy.text))
    .filter(() => false)

export default combineEpics(
  copyFileEpic,
  copyTextEpic
)
