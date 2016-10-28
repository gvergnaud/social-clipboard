import io from 'socket.io-client'
import ss from 'socket.io-stream'
import { Observable } from 'rxjs'

const socket = io('https://cl1pboard.herokuapp.com')
// const socket = io('http://localhost:3000')

const createConnection = eventName => {
  const event$ = new Observable(observer => {
    socket.on(eventName, (...data) => observer.next(data))
    return { unsubscribe: () => socket.removeAllListeners(eventName) }
  }).share()

  const emit = data => socket.emit(eventName, data)

  return { event$, emit }
}


const createStreamConnection = eventName => {
  const event$ = new Observable(observer => {
    ss(socket).on(eventName, (...data) => observer.next(data))
    return { unsubscribe: () => socket.removeAllListeners(eventName) }
  }).share()

  const emit = data => {
    const stream = ss.createStream()
    ss(socket).emit(eventName, stream, data)
    return stream
  }

  return { event$, emit }
}


export const { event$: fileStream$, emit: emitFileStream } = createStreamConnection('file_copy')
export const { event$: textCopy$, emit: emitTextCopy } = createConnection('text_copy')
