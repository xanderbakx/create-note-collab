const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = 8080

// New server connection
io.on('connection', socket => {
  console.log(`New connection: ${socket.id}`)
  // When server socket receives "update-content" message, io broadcasts the content of that message to all clients
  socket.on('update-content', content => {
    console.log('updated')
    // Broadcast event
    io.emit('update-content', content)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
