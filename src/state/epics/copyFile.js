import { COPY_TO_CLIPBOARD } from '../actions/globalShortcutAction'
import { lastCopySelector } from '../modules/history'
import * as Clipboard from '../../services/Clipboard'
import { noopAction } from '../../utils/moduleHelpers'
import { isFileCopy } from '../../utils/copy'


const copyFileEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(() => lastCopySelector(store.getState()))
    .filter(copy => isFileCopy(copy))
    .do(copy => Clipboard.writeFileWithPath(copy.filePath))
    .mapTo(noopAction())


export default copyFileEpic
