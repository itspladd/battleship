class GameEngine {
  
  
  constructor() {
    this.players = {};
  }


  // Add a socket to the list of sockets tracked by the site.
  trackSocket(socket) {
    if (!this.players[socket.id]) {
      this.players[socket.id] = socket;
      console.log('socket added')
    } else {
      throw new Error('Duplicate socket attempted');
    }
  }
}

module.exports = GameEngine;