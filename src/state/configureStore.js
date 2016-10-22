import { createStore, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'
import DevTools from '../app/containers/DevTools'

const enhancer = compose(
  applyMiddleware(createEpicMiddleware(rootEpic)),
  process.env.NODE_ENV === 'development' ? DevTools.instrument() : x => x
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
