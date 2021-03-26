module.exports = function makeDataHelpers(db) {
  return {
    savePlayer: function(newPlayer) {
      return new Promise( (resolve, reject) => {
        console.log('saving player...');
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          id = newPlayer.id;
          db.players[id] = { ...newPlayer }; // Pass in all key/value pairs
          resolve('Player saved!');
        }, 1000);
      })
    },

    logError: function(error) {
      return new Promise( (resolve, reject) => {
        console.log('error encountered. logging...');
        // Simulating a slight delay, replace the timeout with the db interaction
        setTimeout( () => {
          db.errors.push({...error}); // Pass in all key/value pairs
          resolve('Error logged.');
        }, 100);
      })
    }
  };
};