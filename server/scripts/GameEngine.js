class GameEngine {
  
  
  constructor() {
    this.players = {};
  }


  // Add a socket to the list of sockets tracked by the site.
  trackSocket(socket) {
    const id = socket.id;
    if (!this.players[id]) {
      this.players[id] = { id };
    } else {
      throw new Error('Duplicate socket attempted');
    }
  }

  attachPlayerToSocket(socket, username) {
    try {
      this.players[socket.id]['username'] = username;
    } catch (e) {
      console.log(e);
    }

  }

  get playerNames() {
    // Return an array containing the names of all players tracked in the engine
    return Object.values(this.players)
      .filter(player => player.username)
      .map(player => player.username);
  }
}

module.exports = GameEngine;