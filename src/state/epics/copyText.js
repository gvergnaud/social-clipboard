import { COPY_TO_CLIPBOARD } from '../actions/globalShortcutAction'
import { inboxLastSelector } from '../modules/inbox'
import * as Clipboard from '../../services/Clipboard'
import { isTextCopy } from '../../utils/copy'
import { noopAction } from '../../utils/moduleHelpers'


const copyTextEpic = (action$, store) =>
  action$.ofType(COPY_TO_CLIPBOARD)
    .map(() => inboxLastSelector(store.getState()))
    .filter(copy => isTextCopy(copy))
    .do(copy => Clipboard.writeText(copy.text))
    .mapTo(noopAction())


export default copyTextEpic
