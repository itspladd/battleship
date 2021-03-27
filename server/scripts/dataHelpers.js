module.exports = function makeDataHelpers(db) {
  return {
    numPlayers: function() {
      return new Promise( (resolve, reject) => {
        console.log('getting total players...');
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          num = Object.keys(db.players).length;
          resolve(num);
        }, 100);
      });
    },

    savePlayer: function(newPlayer) {
      return new Promise( (resolve, reject) => {
        console.log('saving player...');
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          id = newPlayer.id;
          db.players[id] = { ...newPlayer }; // Pass in all key/value pairs
          console.log(`New player '${newPlayer.username}' added!`)
          resolve(id);
        }, 1000);
      });
    },

    getPlayer: function(id) {
      return new Promise( (resolve, reject) => {
        console.log(`retrieving player ${id}...`);
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          resolve(db.players[id]);
        }, 400);
      })
    },

    // Resolves with the matched user ID. Rejects with an error.
    validateLogin: function(credentials) {
      return new Promise( (resolve, reject) => {
        console.log(`validating login for ${username}...`);
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          for (const id in db.players) {
            if (db.players[id].username === username) {
              resolve(id);
              return;
            }
          }
          reject(`'${username}' not found in database`);
        }, 400);
      })
    },

    validateRegistration: function(profile) {
      return new Promise( (resolve, reject) => {
        console.log(`validating...`);
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          const usernames = Object.values(db.players).map(player => player.username);
          if (!usernames.includes(profile.username)) {
            resolve(profile);
            console.log('validated');
            return;
          }
          console.log('not validated');
          reject(`Username '${profile.username}' already taken.`);
        }, 400);
      })
    },

    getRuleset: function(id) {
      return new Promise( (resolve, reject) => {
        console.log(`retrieving ruleset ${id}...`);
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          resolve(db.rulesets[id]);
        }, 400);
      })
    },

    getBoard: function(id) {
      return new Promise( (resolve, reject) => {
        console.log(`retrieving board ${id}...`);
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          resolve(db.boards[id]);
        }, 400);
      })
    },

    logError: function(error) {
      return new Promise( (resolve, reject) => {
        console.log('error encountered. logging...');
        // Time error thrown
        const time = Date.now();
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          const err = error.toString();
          const rawTrace = error.stack || 'no stack available\n';
          const trace = rawTrace.split('\n').filter(str => str !== '');
          db.errors.push({time, err, trace}); // Pass in all key/value pairs
          resolve('Error logged.');
        }, 100);
      })
    }
  };
};