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
let roomID = ""

joinRoomBtn.addEventListener("click", (e) => {
    e.preventDefault()
    roomID = roomIDInput.value
    socket.emit("join-room", roomID)
    document.getElementById("roomID").innerHTML = `Room ID: ${roomID}`
})

// Temp
const testSendBtn = document.getElementById("subText-btn")
const testTxtInput = document.getElementById("text-input")

testSendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('temp-text', testTxtInput.value, roomID)
})

socket.on('send-txt', (txt) => {
    document.getElementById("yey").innerHTML = `Recieved: ${txt}`
})