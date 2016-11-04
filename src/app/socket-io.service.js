'use strict'


import Socket       from 'socket.io'
import config       from './config'


const io = new Socket(config.env.socketPort)
console.log('WebSocket listening on http://localhost:' + config.env.socketPort)

io.on('connection', () => {
    console.log('user connected')
})



module.exports = io

