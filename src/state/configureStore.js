import { createStore, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'
import createLogger from 'redux-logger'

const enhancer = applyMiddleware(
  createEpicMiddleware(rootEpic),
  createLogger()
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    // Enable Webpack hot module replacement for ./modules/reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
