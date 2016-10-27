import { Server } from 'http'
import path from 'path'
import express from 'express'

const app = express()
const http = Server(app)
const port = process.env.PORT || 3000

const config = require('./webpack.config.dev')
const compiler = require('webpack')(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

http.listen(port, () => {
  console.log(process.env.NODE_ENV)
  console.log('server running on port', port)
})
