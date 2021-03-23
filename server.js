// Set up the express app, the server, and the socket.
const express = require('express');
const GameEngine = require('./server/scripts/GameEngine');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hlp = require('./server/scripts/serverHelpers');

const PORT = 8080;

const engine = new GameEngine();

// Set the path for static files.
app.use(express.static('public'));

io.on('connection', socket => {
  console.log('connected!');

  socket.emit('user list', engine.playerNames);
  
  // Add this socket to the list of sockets currently at the site
  try {
    engine.trackSocket(socket);
  } catch (e) {
    // TODO: Log the error somewhere else.
    console.log(e);
  }
  
  // When this socket logs in, send their name to the list of users.
  // TODO: Flesh out user validation.
  socket.on('login attempt', username => {
    if (hlp.validateUser(username)) {
      engine.attachPlayerToSocket(socket, username);
      socket.emit('login successful');
      io.emit('user joined', username);
    }
  });

  socket.on('request board update', () => {
    console.log('update requested, sending: ', engine.board);
    socket.emit('board update', engine.board);
  })

  socket.on('disconnect', () => {
    if (engine.socketHasUsername(socket)) {
      io.emit('user left', engine.players[socket.id].username);
    }
    engine.removeSocket(socket);
  });
});


http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})