const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://172.0.0.1:5500']
    }
})
io.on('connection', (socket) => {
    console.log(`User Connected with ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})