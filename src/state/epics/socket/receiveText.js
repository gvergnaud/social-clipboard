import shortId from 'shortid'
import { textCopy$ } from '../../../services/Socket'
import { createTextCopy } from '../../../utils/copy'
import { create } from '../../actions/inboxActions'
import { receive } from '../../actions/textActions'
import { notifyTextReceived } from '../../../services/Notification'


const receiveTextEpic = () =>
  textCopy$
    .do(([ text ]) => notifyTextReceived(text))
    .map(([ text ]) => create(shortId.generate(), createTextCopy(receive(text))))


export default receiveTextEpic
