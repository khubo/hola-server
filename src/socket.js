export default socket => {

  console.log(`${socket.request.user} connected`)
  socket.emit('success', {
    message: 'sucessfully logged in'
  })

  socket.on('message', (message) => {
    console.log(`${socket.request.user}: ${message}`)
  })
}