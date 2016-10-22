import { Server } from 'http'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import Io from 'socket.io'


const app = express()
const http = Server(app)
const io = Io(http)
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development'


if (isDev) {
  const config = require('./webpack.config.dev')
  const compiler = require('webpack')(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}


io.on('connect', socket => {
  console.log('new connection')
})

app.use(bodyParser())

app.post('/new-buzzword', (req, res) => {
  io.sockets.emit('new-buzzword', req.body)
  res.status(200)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

http.listen(port, () => {
  console.log(process.env.NODE_ENV)
  console.log('server running on port', port)
})
