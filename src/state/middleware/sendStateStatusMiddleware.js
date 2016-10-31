import { Subject } from 'rxjs'

global.stateStatus$ = new Subject()

const sendActionMiddleware = store => next => action => {
  const prevState = store.getState()
  const returnedValue = next(action)
  const nextState = store.getState()
  global.stateStatus$.next({ action, prevState, nextState })
  return returnedValue
}

export default sendActionMiddleware
