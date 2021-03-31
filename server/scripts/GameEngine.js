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
  
  constructor(DataHelpers, socket, hostID) {
    // Players are tracked by their socket ID.
    this.pollFrequency = 1000; // How often to poll, in ms
    this.timeoutDuration = 300; // How long till timeout, in s
    this.db = DataHelpers;
    this.hostSocket = socket;
    this.hostID = hostID;
    this.players = [];

    //Add the first player
    this.db.getPlayer(hostID)
    .then(player => addPlayer(player, socket))
    .catch(err => this.db.logError(err));
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

  addPlayer(player, socket) {
    const id = player.id;
    const username = player.username;
    this.players.push = {id, username, socket};
    this.checkGameStart();
  }

  checkGameStart() {
    if(this.enoughPlayers()) {
      this.runGame();
    };
  }

  chooseRules() {
    return new Promise( (resolve, reject ) => {
      
    });
  }

  // Will poll the number of tracked players and start a game when there's enough. 
  waitForPlayers() {
    return new Promise( (resolve, reject) => {
      let polls = 0;
      console.log('Waiting for players...');
      const wait = setInterval( () => {
        polls++;
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

  runGame() {
    console.log('game started');
  }

  setupBoard(rules) {
    return new Board(rules.boardType);
  }

}

module.exports = GameEngine;