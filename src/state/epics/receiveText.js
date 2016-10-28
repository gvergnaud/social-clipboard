import shortId from 'shortid'
import * as Notification from '../../services/Notification'
import { textCopy$ } from '../../services/Socket'
import { create, text as textAction } from '../actions/historyActions'
import { receive } from '../actions/textActions'


const receiveTextEpic = () =>
  textCopy$
    .do(([ text ]) => Notification.newTextCopy(text))
    .map(([ text ]) => create(shortId.generate(), textAction(receive(text))))


export default receiveTextEpic
