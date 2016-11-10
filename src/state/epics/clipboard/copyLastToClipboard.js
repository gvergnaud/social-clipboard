import { combineEpics } from 'redux-observable'
import { inboxLastSelector } from '../../modules/inbox'
import * as Clipboard from '../../../services/Clipboard'
import { isFileCopy, isTextCopy, extract } from '../../../utils/copy'
import { COPY_LAST_TO_CLIPBOARD } from '../../actions/clipboardActions'

const copyLastTextEpic = (action$, store) =>
  action$.ofType(COPY_LAST_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isTextCopy(copy))
    .map(extract)
    .do(copyValue => Clipboard.writeText(copyValue.text))
    .filter(() => false)

const copyLastFileEpic = (action$, store) =>
  action$.ofType(COPY_LAST_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isFileCopy(copy))
    .map(extract)
    .do(copyValue => Clipboard.writeFileWithPath(copyValue.filePath))
    .filter(() => false)


export default combineEpics(
  copyLastTextEpic,
  copyLastFileEpic
)
