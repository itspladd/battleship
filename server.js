// Set up the express app, the server, and the socket.
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 8080;

app.get('/', (req, res) => {
  console.log('Home req');
});


http.listen(PORT, () => {
  console.log(`Battleship app listening on port ${PORT}:`)
})