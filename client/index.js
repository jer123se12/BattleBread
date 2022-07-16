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

document.getElementById("roomID").innerHTML = "Error: Server not found"
joinRoomBtn.addEventListener("click", (e) => {
    e.preventDefault()
    roomID = roomIDInput.value
    socket.emit("join-room", roomID)
    document.getElementById("roomID").innerHTML = `Room ID: ${roomID}`
})

// Manage Cells
const cellClicked = (id) => {
    console.log(`Cell with ID: ${id} clicked.`)
    document.getElementById(id).innerHTML = "X"
    socket.emit("send-tile", id, roomID)
}

let usr1Cells = document.getElementById("u1grid").getElementsByTagName("td")
for (let i = 0; i < usr1Cells.length; i++) {
    if (usr1Cells[i].id.includes("u1")) {
        usr1Cells[i].onclick = function(){cellClicked(usr1Cells[i].id)}
    }
}

let usr2Cells = document.getElementById("u2grid").getElementsByTagName("td")
for (let i = 0; i < usr2Cells.length; i++) {
    if (usr2Cells[i].id.includes("u2")) {
        usr2Cells[i].onclick = function(){cellClicked(usr2Cells[i].id)}
    }
}
socket.on("recieve-tile", (tile) => {
    document.getElementById(tile).innerHTML = "X"
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