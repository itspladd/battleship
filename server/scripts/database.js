// Dummy in-memory database, to be replaced once I get some DB practice.
const database = {
  players: {
    'p0': {
      id: 'p123',
      username: 'Pladd',
      email: 'contact@itspladd.com',
      password: 'baconator', // TODO: Hash it
      gameHistory: [], // Array of game IDs
    },
  },
  pastGames: {
    'g123': {
      ruleset: {},
      moves: [],
    },
  },
  boards: {
    default: {
      dimensions: [10, 10],
    }
  },
  rulesets: {
    default: {
      board: 'default',
      players: 2,
    }
  },
  usernames: [],
  errors: [],
};

module.exports = database;