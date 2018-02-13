import redis from 'redis'
import bluebird from 'bluebird'
import config from 'config'


// promisify redis
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const { host, port, password } = config.get('redis');

const client = redis.createClient(port, host, { no_ready_check: true })
if(process.env.NODE_ENV === 'production') {
  client.auth(password, (err) => {
    if(err) console.log('error authenticating: ', e);
  })
}

client.on('error', (err) => {
  console.log('error establishing redis connection')
  process.exit(1)
})

export default client