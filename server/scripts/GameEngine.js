class GameEngine {

  /****
   * This is the object that runs a single game.
   * Each GameEngine tracks the following:
   *  -Board object
   *  -Player objects
   *  -History, as a list of Move objects
   *  -Turn
   *  -Game phase
   * 
   * Game phase concept: promise loop
   * after two players have joined...
   * 
   * runGame {
   *   setupBoard (both players place their ships)
   *   then chooseFirstPlayer
   *   then gameLoop
   *      player moves
   *      process move
   *      update board
   *      switch player
   *      check for endgame condition
   *        game over? go to postgame
   *        no game over? gameLoop
   *   store game data
   *   return to lobby
   * }
   *  
   * 
   * 
   */
  
  constructor() {
    // Players are tracked by their socket ID.
    this.players = {};
  }


  // Add a socket ID to the list of sockets tracked by the engine.
  trackSocket(socket) {
    const id = socket.id;
    if (!this.players[id]) {
      this.players[id] = { id };
    } else {
      throw new Error('Duplicate socket attempted');
    }
  }

  // Remove a player from the list.
  removeSocket(socket) {
    delete this.players[socket.id];
  }

  // Attach a player to that user's socket.
  attachPlayerToSocket(socket, username) {
    try {
      this.players[socket.id]['username'] = username;
    } catch (e) {
      console.log(e);
    }
  }

  // Check if a given socket has a username attached.
  socketHasUsername(socket) {
    return this.players[socket.id].username ? true : false;
  }

  get playerNames() {
    // Return an array containing the names of all players tracked in the engine
    return Object.values(this.players)
      .filter(player => player.username)
      .map(player => player.username);
  }
}

module.exports = GameEngine;