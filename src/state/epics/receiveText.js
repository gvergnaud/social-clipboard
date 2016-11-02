import shortId from 'shortid'
import * as Notification from '../../services/Notification'
import { textCopy$ } from '../../services/Socket'
import { createTextCopy } from '../../utils/copy'
import { create } from '../actions/inboxActions'
import { receive } from '../actions/textActions'


const receiveTextEpic = () =>
  textCopy$
    .do(([ text ]) => Notification.newTextCopy(text))
    .map(([ text ]) => create(shortId.generate(), createTextCopy(receive(text))))


export default receiveTextEpic
