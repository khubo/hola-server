import jwt from 'jsonwebtoken'
import config from '../config'

export const createToken = (username) => {

  return jwt.sign({ username }, config.jwt_secret)
}