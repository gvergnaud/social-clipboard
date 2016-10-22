import React from 'react'
import ReactDOM from 'react-dom'
import DevTools from './containers/DevTools'

/*
 * Puts Redux DevTools into a separate window.
 * Based on https://gist.github.com/tlrobinson/1e63d15d3e5f33410ef7#gistcomment-1560218.
 */
export default function createDevToolsWindow(store) {
  setTimeout(() => ReactDOM.render(
    <DevTools store={store} />,
    window.document.body.appendChild(document.createElement('div'))
  ), 10)
}
