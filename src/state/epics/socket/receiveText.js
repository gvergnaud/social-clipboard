import { Observable } from 'rxjs'
import shortId from 'shortid'
import { textCopy$ } from '../../../services/Socket'
import { createTextCopy } from '../../../utils/copy'
import { create } from '../../actions/inboxActions'
import { receive } from '../../actions/textActions'
import { notifyTextReceived } from '../../actions/notificationActions'


const receiveTextEpic = () =>
  textCopy$
    .flatMap(([ text ]) => Observable.of(
      notifyTextReceived(text),
      create(shortId.generate(), createTextCopy(receive(text)))
    ))


export default receiveTextEpic
