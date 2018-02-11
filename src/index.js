import express from 'express'
import bodyParser from 'body-parser'
import winston from 'winston'
import cors from 'cors'
import { createUser } from './services/user'

const app = express()
const port = process.env.PORT || 1337

// register middlewares
app.use(bodyParser.json())
app.use(cors())

app.post('/user', createUser)

app.listen(port, () => {
  winston.info(`app started listening on port ${port}`)
})