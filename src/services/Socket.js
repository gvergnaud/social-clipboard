import io from 'socket.io-client'
import {Observable} from 'rxjs'

const socket = io('https://cl1pboard.herokuapp.com')

const createConnection = eventName => {
  const stream$ = new Observable(observer => {
    socket.on(eventName, data => observer.next(data))
    return { unsubscribe: () => socket.removeAllListeners(eventName) }
  }).share()

  const emit = data => socket.emit(eventName, data)

  return { stream$, emit }
}


export const { stream$: fileCopy$, emit: emitFileCopy } = createConnection('file_copy')
export const { stream$: textCopy$, emit: emitTextCopy } = createConnection('text_copy')
