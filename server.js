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

io.on('connection', socket => {
  console.log('connected!');
  
  // Add this socket to the list of sockets currently at the site
  try {
    engine.trackSocket(socket);
  } catch (e) {
    // TODO: Log the error somewhere else.
    console.log(e);
  }
  
  // When this socket logs in, send their name to the list of users.
  socket.on('login attempt', username => {
    io.emit('user joined', username);
    console.log('emitted user join event')
    // TODO: Associate this player's account with their socket in the engine.
  })
});


http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})