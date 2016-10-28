import { COPY_TO_CLIPBOARD } from '../actions/globalShortcutAction'
import { lastCopySelector, isTextCopy } from '../modules/history'
import * as Clipboard from '../../services/Clipboard'
import { noopAction } from '../../utils/moduleHelpers'


const copyTextEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(() => lastCopySelector(store.getState()))
    .filter(copy => isTextCopy(copy))
    .do(copy => Clipboard.writeText(copy.text))
    .mapTo(noopAction())


export default copyTextEpic
