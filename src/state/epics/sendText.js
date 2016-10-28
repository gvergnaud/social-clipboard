import * as Notification from '../../services/Notification'
import * as Clipboard from '../../services/Clipboard'
import { SEND_CLIPBOARD_CONTENT } from '../actions/globalShortcutAction'
import { emitTextCopy } from '../../services/Socket'
import { noopAction } from '../../utils/moduleHelpers'

const sendTextEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => !Clipboard.isFile())
    .map(() => Clipboard.readText())
    .do(text => emitTextCopy(text))
    .do(text => Notification.textCopySent(text))
    .mapTo(noopAction())

export default sendTextEpic
