import redis from './redis'

const users = {

}

export default socket => {

  let { user } = socket.request.user
  console.log(`${user} connected`)
  users[user] = socket

  socket.emit('success', {
    message: 'sucessfully logged in'
  })

  socket.on('message', (message) => {
    users[user].emit('new_message', {
      message,
      user: socket.request.user
    })
  })
}