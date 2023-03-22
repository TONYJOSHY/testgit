const express = require('express');
const http = require('http');
const socket = require('socket.io');
// const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New connection added');

    socket.on('disconnect', () => console.log('Disconnected from server'));

    socket.emit('newemail', {
        text: "Data from server",
        timeStamp: new Date().getTime().toString()
    });

    socket.on('createEmail', (email) => {
        console.log(email)
        // socket.broadcast.emit('newemail', email)
        io.emit('newemail', email)
    })
})

server.listen(port, () => {
    console.log(`Server started at ${port}`);
});