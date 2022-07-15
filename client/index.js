import { io } from "socket.io-client";

// Socket.io Server
const socket = io('http://localhost:3000')

socket.on("connect", () => {
    console.log(`Connected with ${socket.id}`)
    document.getElementById("roomID").innerHTML = `Room ID: ${socket.id}`
})

// HTML
const joinRoomBtn = document.getElementById("join-btn")
const roomIDInput = document.getElementById("id-input")

joinRoomBtn.addEventListener("click", () => {
    const roomID = roomIDInput.value
})