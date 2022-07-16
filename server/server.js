const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
})
io.on('connection', (socket) => {
    console.log(`User Connected with ${socket.id}`)

    socket.on("send-tile", (tile, room) => {
        socket.to(room).emit("recieve-tile", tile)
    })

    socket.on("join-room", (room) => {
        socket.join(room)
    })

    socket.on("temp-text", (txt, roomID) => {
        socket.to(roomID).emit("send-txt", txt)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})