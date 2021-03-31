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
  
  constructor(DataHelpers, gameID, socket, hostID) {
    // Players are tracked by their socket ID.
    this.pollFrequency = 1000; // How often to poll, in ms
    this.timeoutDuration = 300; // How long till timeout, in s
    this.db = DataHelpers;
    this.id = gameID;
    this.hostSocket = socket;
    this.hostID = hostID;
    this.players = [];

    //Add the first player
    this.db.getPlayer(hostID)
    .then(player => this.addPlayer(player, socket))
    .catch(err => this.db.logError(err));

    // Let others know a new game started
    this.sendNewGameEvent();

    // Configure rules
    this.rules = this.chooseRules();

    // Get the board initialized
    this.board = this.setupBoard(this.rules);
  }

  addPlayer(player, socket) {
    // TODO: What if there's already enough players?
    const id = player.id;
    const username = player.username;
    this.players.push = {id, username, socket};
    socket.emit('joined game', this.id);
    this.checkGameStart();
  }

  checkGameStart() {
    if(this.enoughPlayers()) {
      this.runGame();
    };
  }

  sendNewGameEvent() {
    this.hostSocket.broadcast.emit('joinable game', { id: this.id, host: this.hostID});
  }

  chooseRules() {
    // For now, just return a hard-coded default board.
    return {
      board: {
        dimensions: [10, 10],
      },
      players: 2,
    }
  }

  setupBoard(rules) {
    return new Board(rules.board);
  }

  enoughPlayers() {
    return this.players.length === this.rules.players;
  }

  runGame() {
    // Get players to set up boards, then
    // Choose first player, then
    // Start game loop
      // Player sends move, then
      // Validate the move, then
      // Check for game end, then
        // Go to postgame if game is over
      // Update the board, then
      // Switch players, then
      // Back to start
    console.log('game started');
  }

}

module.exports = GameEngine;