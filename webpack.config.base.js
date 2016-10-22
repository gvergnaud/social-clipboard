const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ]
  },
  target: 'electron-renderer',
  externals: [
    'nodobjc',
    'progress-stream',
    'node-notifier',
    'ws',
  ]
}
