export default socket => {

  console.log(`${socket.request.user} connected`)
  socket.emit('success', {
    message: 'sucessfully logged in'
  })
}