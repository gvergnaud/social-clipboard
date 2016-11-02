import { remote } from 'electron'
import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'app/containers/App'

const isDev = process.env.NODE_ENV === 'development'
const store = remote.getGlobal('store')
const stateStatus$ = remote.getGlobal('stateStatus$')

function bootstrap(RootComponent) {
  render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.querySelector('#mount')
  )
}

function startDebug() {
  window.store = store

  // a subject sent by the store with all the data to help debugging
  stateStatus$.forEach(({ action, prevState, nextState }) => {
    // eslint-disable-next-line
    console.log(
      'action type :', action.type, '\n',
      'action :', cloneDeep(action), '\n',
      'prevState :', cloneDeep(prevState), '\n',
      'nextState :', cloneDeep(nextState), '\n',
    )
  })
}

bootstrap(App)

if (isDev) startDebug()

if (module.hot) {
  module.hot.accept('app/containers/App', () => {
    const NextApp = require('app/containers/App').default
    bootstrap(NextApp)
  })
}
