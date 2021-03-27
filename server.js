// Set up the express app, the server, and the socket.
const express = require('express');
const GameEngine = require('./server/scripts/GameEngine');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hlp = require('./server/scripts/serverHelpers');

const PORT = 8080;

const db = require('./server/scripts/database');
const DataHelpers = require('./server/scripts/dataHelpers.js')(db);

// Set up game engine - this will eventually get moved into
// its own space.
const games = {};

// Track all active connections
const loggedInUsers = {};

// Set the path for static files.
app.use(express.static('public'));

app.get('/players', (req, res) => {
  res.json(db.players);
});

app.get('/errors', (req, res) => {
  res.json(db.errors);
});

io.on('connection', socket => {
  console.log('connected!');
  //socket.emit('user list', engine.playerNames);
  
  // When this socket logs in, send their name to the list of users.
  // TODO: Flesh out user validation.
  socket.on('login attempt', username => {
    if (DataHelpers.validateLogin(username)) {
      
      loggedInUsers[socket.id] = username;
      socket.emit('login successful');
      io.emit('user joined', username);
    }
  });

  socket.on('registration attempt', data => {
    console.log(`registering`, data)
    const id = hlp.randomUserId();
    const username = data.username;
    const email = 'test@example.beans';
    const password = 'badpassword';
    const gameHistory = [];
    const profile = { username, id, email, password, gameHistory }
    DataHelpers.validateRegistration(profile)
    .then(profile => DataHelpers.savePlayer(profile))
    .then(() => {
      loggedInUsers[socket.id] = profile.id;
      socket.emit('registration successful');
    })
    .catch(err => console.log(err));
  });

  // Create and track a new game with the socket as the host.
  socket.on('new game', () => {
    const engine = new GameEngine(DataHelpers, socket);
    const id = games.length;
    games[id] = {id, engine};
  });

  socket.on('request board update', () => {
    try {
      socket.emit('board update', engine.board.tiles);
    } catch (e) {
      DataHelpers.logError(e);
    }
  });

  socket.on('disconnect', () => {
    if (loggedInUsers[socket.id]) {
      io.emit('user left', loggedInUsers[socket.id].username);
    }
  });
});


http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})