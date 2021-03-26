// Dummy in-memory database, to be replaced once I get some DB practice.
const database = {
  players: {
    'p123': {
      id: 'p123',
      username: 'Pladd',
      email: 'contact@itspladd.com',
      password: 'baconator', // TODO: Hash it
      gameHistory: [], // Array of game IDs
    },
  },
  games: {
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
    }
  },
  usernames: [],
  errors: [],
};

module.exports = database;