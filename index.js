const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080
const socketIO = require('socket.io');

const server = express()
    .get('/*', (req, res) => {
        res.sendFile(path.join(__dirname + req.originalUrl)) })
    .get('/', (req, res) => {
        res.sendFile('/index.html', { root: __dirname })
    })
    .listen(port, () =>  console.log(`Listening on http://localhost:${port}`))

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('User Connected with ID: ' + socket.id);

    socket.on('message', (message) => {
        io.emit('message', {id: socket.id, name: message.name, content: message.content});
    });
});