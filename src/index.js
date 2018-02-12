import express from 'express'
import bodyParser from 'body-parser'
import winston from 'winston'
import cors from 'cors'
import http from 'http'
import socketIo from 'socket.io'
import handleSocket from './socket'
import { createUser } from './services/user'

const app = express()
const server = http.Server(app)
const io = socketIo(server)
const port = process.env.PORT || 1337

// register middlewares
app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials: true}))
io.on('connection', handleSocket)

app.post('/user', createUser)

server.listen(port, () => {
  winston.info(`app started listening on port ${port}`)
})