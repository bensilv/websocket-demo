const express = require("express");
const path = require("path");
// const http = require('http').createServer();
const port = process.env.PORT || 8080
const socketIO = require('socket.io');
// const io = require('socket.io')(http, {
//     cors: {origin: "*"}
// });

const server = express()
    // .get('/node_modules*', (req, res) => {
    //     console.log(req.originalUrl)
    //     res.sendFile(path.join(__dirname + req.originalUrl)) })
    // .get('/app.js', (req, res) => {
    //     console.log(req.originalUrl)
    //     res.sendFile(path.join(__dirname + req.originalUrl)) })
    .get('/*', (req, res) => {
        // console.log(req.originalUrl)
        res.sendFile(path.join(__dirname + req.originalUrl)) })
    .get('/', (req, res) => {
        // console.log('here' + req.originalUrl)
        res.sendFile('/index.html', { root: __dirname })
    })
    .listen(port, () =>  console.log(`Listening on http://localhost:${port}`))

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('User Connected with ID: ' + socket.id);
    // socket.emit('newID', () => pageId)

    socket.on('message', (message) => {
        // console.log(message);
        io.emit('message', {id: socket.id, name: message.name, content: message.content});
    });
});

// http.listen(port, () => console.log('listening on http://localhost:' + port));