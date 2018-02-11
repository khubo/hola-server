import redis from 'redis'
import bluebird from 'bluebird'


// promisify redis
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient()
client.on('error', (err) => {
  console.log('error establishing redis connection')
  process.exit(1)
})

export default client