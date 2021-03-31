const randomUserId = () => {
  return `p${randomString(8)}`;
}

// Generates a random integer between two values.
const randInt = (min, max) => {
  const range = (max - min) + 1;
  return Math.floor((Math.random() * range) + min);
};

// Creates a string of random alphanumeric (upper and lowercase) characters
// Length can be any length, default is 6
const randomString = (length = 6) => {
  let str = "";

  while (str.length < length) {
    let code = randInt(48, 122);
    if (!(code > 57 && code < 65) && !(code > 90 && code < 97)) {
      str += String.fromCharCode(code);
    }
  }

  return str;
};

const trackLoggedInPlayer = (player, socket, trackingObj) => {
  const id = player.id;
  const username = player.username;
  trackingObj[socket.id] = { id, username};
};

module.exports = {
  randomUserId,
  trackLoggedInPlayer,
};