// Set up the express app, the server, and the socket.
const express = require('express');
const GameEngine = require('./server/scripts/GameEngine');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 8080;

const engine = new GameEngine();

// Set the path for static files.
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('connected!');
  engine.trackSocket(socket);
});

io.on()

http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})