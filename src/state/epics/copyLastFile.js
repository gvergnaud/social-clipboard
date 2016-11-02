import { COPY_LAST_TO_CLIPBOARD } from '../actions/globalShortcutAction'
import { inboxLastSelector } from '../modules/inbox'
import * as Clipboard from '../../services/Clipboard'
import { noopAction } from '../../utils/moduleHelpers'
import { isFileCopy } from '../../utils/copy'


const copyLastFileEpic = (action$, store) =>
  action$.ofType(COPY_LAST_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isFileCopy(copy))
    .do(copy => Clipboard.writeFileWithPath(copy.filePath))
    .mapTo(noopAction())


export default copyLastFileEpic
