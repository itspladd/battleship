class GameEngine {
  
  
  constructor() {
    this.players = {};
  }

  addPlayer(socket) {
    if (!this.players[socket.id]) {
      this.players[socket.id] = socket;
      console.log('added')
    } else {
      console.log('duplicate player attempted');
    }
  }
}

module.exports = GameEngine;