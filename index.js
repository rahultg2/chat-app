// Node server to handle the socket.io
const io = require('socket.io')()

const express = require('express')
const app = express()
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/CLIENT_SIDE'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})


const users = {};

io.on('connection', socket =>{
    // If the new user joined, then others gets the message of joining
    socket.on('new-user-joined', name =>{
        // console.log("User joined", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    }); 

    // If one send a message, broadcast to the other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If one left the chat, other will get the message
    socket.on('disconnect', message =>{
        socket.broadcast.emit('user_left', users[socket.id]);
        delete users[socket.id];
    });
})

console.log("Test")