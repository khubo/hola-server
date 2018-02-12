import winston from 'winston'
import { promisify } from 'util'
import redis from '../redis'
import geo from '../georedis'
import { createToken } from '../utils/jwt'

geo.addLocationAsync = promisify(geo.addLocation)
export const createUser = (req, res) => {
  
  winston.info(`request recieved ${JSON.stringify(req.body) }`)
  let { username, position } = req.body

  if (!username || position.length != 2) {
    res.status(400)
    return res.send('insufficient parameters')
  }

  (async () => {
    try {
      let usernameExists = !!(await redis.getAsync(username))
      if (usernameExists) {
        return res.status(400).send('username taken')
      }
      redis.set(username, Date.now())
      const reply = await geo.addLocationAsync(username, { latitude: position[0], longitude: position[1]})
      let token = createToken(username)
      res.send({ token })
    } catch (e) {
      winston.info(`error: ${e}`)
      res.status(400).send('error creating user')
    }
  })()
}