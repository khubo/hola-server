import express from 'express'
import bodyParser from 'body-parser'
import winston from 'winston'
import cors from 'cors'
import http from 'http'
import socketIo from 'socket.io'
import socketAuth from 'socketio-jwt-auth'
import handleSocket from './socket'
import redis from './redis'
import { createUser } from './services/user'
import config from './config'

const app = express()
const server = http.Server(app)
const io = socketIo(server)
const port = process.env.PORT || 1337

// register middlewares
app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials: true}))


io.on('connection', handleSocket)
io.use(socketAuth.authenticate({
    secret: config.jwt_secret,
  }, (payload, done) => {
  redis.getAsync(payload.username).then(data => {
    if(data) return done(null, payload.username)
    return done(null, false, 'user doesnot exist')
  })
}))

app.post('/user', createUser)

server.listen(port, () => {
  winston.info(`app started listening on port ${port}`)
})