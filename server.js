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

app.get('/loggedIn', (req, res) => {
  res.json(loggedInUsers);
});

app.get('/games', (req, res) => {
  res.json(games);
});

app.get('/errors', (req, res) => {
  res.json(db.errors);
});

io.on('connection', socket => {
  console.log('connected!');
  socket.emit('user list', loggedInUsers);
  
  // When this socket logs in, send their name to the list of users.
  // TODO: Flesh out user validation.
  socket.on('login attempt', username => {
    DataHelpers.validateLogin(username)
    .then(player => {
      hlp.trackLoggedInPlayer(player, socket, loggedInUsers)
      socket.emit('login successful');
      io.emit('user joined', loggedInUsers[socket.id]);
    })
    .catch(err => console.log(err));
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
    .then(player => {
      hlp.trackLoggedInPlayer(player, socket, loggedInUsers)
      socket.emit('registration successful');
    })
    .catch(err => console.log(err));
  });

  // Create and track a new game with the socket as the host.
  socket.on('new game', () => {
    const hostID = loggedInUsers[socket.id].id;
    let gameID;
    do {
      gameID = hlp.randomGameId();
    } while (games[gameID]);
    const engine = new GameEngine(DataHelpers, gameID, socket, hostID);
    games[gameID] = engine;
  });

  socket.on('request board update', () => {
    try {
      socket.emit('board update', engine.board.tiles);
    } catch (e) {
      DataHelpers.logError(e);
    }
  });

  socket.on('disconnect', () => {
    const socketID = socket.id;
    if (loggedInUsers[socketID]) {
      const id = loggedInUsers[socketID].id;
      console.log('disconnecting ', id);
      DataHelpers.getPlayer(id)
      .then(player => {
        delete loggedInUsers[socketID];
        io.emit(`user left`, player)
      })
      .catch(err => console.log(err));
    }
  });
});


http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})