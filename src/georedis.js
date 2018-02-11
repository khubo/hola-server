import redis from './redis'
import georedis from 'georedis'

export default georedis.initialize(redis)