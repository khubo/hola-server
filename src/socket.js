import { promisify } from 'util'
import redis from './redis'
import geo from './georedis'

geo.locationAsync = promisify(geo.location)
geo.nearbyAsync = promisify(geo.nearby)
const users = {

}

export default socket => {

  let { user } = socket.request
  console.log(`${user} connected`)
  users[user] = socket

  socket.emit('success', {
    message: 'sucessfully logged in'
  })

  socket.on('message', (message) => {
    (async () => {
      try {
        let location = await geo.locationAsync(user)
        let nearby = await geo.nearbyAsync(user, 2000)
        nearby.map(id => {
          users[id].emit('new_message', {
            message,
            user
          })
        })
      } catch (e) {
        console.log('error sending message', e)
      }
    })()
  })
}