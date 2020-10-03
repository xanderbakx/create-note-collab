const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = 8080

io.on('connection', socket => {
  console.log(`New connection: ${socket.id}`)
  socket.on('text-change', change => {
    io.emit('remote-change', change)
  })
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
