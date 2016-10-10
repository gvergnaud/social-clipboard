import io from 'socket.io-client'
import {Observable} from 'rxjs'

const socket = io('https://cl1pboard.herokuapp.com')

export const copy$ = new Observable(observer => {
  socket.on('copy', data => {
    observer.next(data)
  })
  return { unsubscribe: () => socket.removeAllListeners('copy') }
}).publish()

copy$.connect()


export const emitCopy = data => socket.emit('copy', data)
