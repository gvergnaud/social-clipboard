import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import FilterMonitor from 'redux-devtools-filter-actions'

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="alt-w"
    changePositionKey="alt-q"
    defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

export default DevTools
