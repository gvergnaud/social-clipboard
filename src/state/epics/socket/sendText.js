import * as Clipboard from '../../../services/Clipboard'
import { emitTextCopy } from '../../../services/Socket'
import { notifyTextSent } from '../../actions/notificationActions'
import { SEND_CLIPBOARD_CONTENT } from '../../actions/socketActions'

const sendTextEpic = action$ =>
  action$.ofType(SEND_CLIPBOARD_CONTENT)
    .filter(() => !Clipboard.isFile())
    .map(() => Clipboard.readText())
    .do(text => emitTextCopy(text))
    .map(text => notifyTextSent(text))

export default sendTextEpic
