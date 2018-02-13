import jwt from 'jsonwebtoken'
import config from 'config'

const jwt_secret = config.get('jwt_secret')

export const createToken = (username) => {

  return jwt.sign({ username }, config.jwt_secret)
}