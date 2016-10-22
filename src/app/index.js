import { remote } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'app/containers/App'

const bootstrap = (RootComponent) => {
  const store = remote.getGlobal('store')

  window.store = store

  render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.querySelector('#mount')
  )

  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    require('./createDevToolsWindow').default(store) // eslint-disable-line
  }
}

bootstrap(App)

if (module.hot) {
  module.hot.accept('app/containers/App', () => {
    const NextApp = require('app/containers/App').default
    bootstrap(NextApp)
  })
}
