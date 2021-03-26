const Board = require('./Board');

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
    this.pollFrequency = 1000; // How often to poll, in ms
    this.timeoutDuration = 300; // How long till timeout, in s
    this.players = {};
    this.rulesets = this.loadRulesets();
    this.rules = this.configureRules();
    // Wait for players, then
    // Get both players to set up boards, then
    // Choose first player, then
    // Start game loop
      // Player sends move, then
      // Validate the move, then
      // Check for game end, then
        // Go to postgame if game is over
      // Update the board, then
      // Switch players, then
      // Back to start

    this.board = this.setupBoard(this.rules);
    this.waitForPlayers()
    .then(res => console.log(res))
    .catch(rej => console.log(rej));
  }

  waitForPlayers() {
    return new Promise( (resolve, reject) => {
      let polls = 0;
      const wait = setInterval( () => {
        polls++;
        console.log(`Poll ${polls}. Current players: ${this.playerNames.length}. Waiting for ${this.rules.players} players...`);
        if (this.enoughPlayers()) {
          clearInterval(wait);
          resolve('Enough players!');
          return;
        }
        if (polls === this.timeoutDuration) {
          clearInterval(wait);
          reject('Waiting for players timed out.');
        }
      }, this.pollFrequency);
    });
  };

  enoughPlayers() {
    return this.playerNames.length === this.rules.players;
  }

  startGame() {
    console.log('game started');
  }

  loadRulesets() {
    return require('../constants/rulesets');
  }

  // For now, just set the default ruleset.
  configureRules() {
    return this.rulesets.defaultRuleset;
  }

  setupBoard(rules) {
    return new Board(rules.boardType);
  }

  // Add a socket ID to the list of sockets tracked by the engine.
  trackSocket(socket) {
    const id = socket.id;
    if (!this.players[id]) {
      this.players[id] = { socket };
      socket.emit('tracked');
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