class GameEngine {
  
  
  constructor() {
    this.players = {};
  }

  trackSocket(socket) {
    if (!this.players[socket.id]) {
      this.players[socket.id] = socket;
      console.log('socket added')
    } else {
      console.log('duplicate player attempted');
    }
  }
}

module.exports = GameEngine;