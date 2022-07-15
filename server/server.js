const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
})
io.on('connection', (socket) => {
    console.log(`User Connected with ${socket.id}`)

    socket.on("send-tile", (tile, room) => {
        if (room !== "") {
            socket.to(room).emit("recieve-tile", tile)
        }
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})