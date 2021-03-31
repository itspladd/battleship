/***********************
 * HELPER FUNCTIONS
 ***********************/

/**
 * drawBoard
 * Given a Board object, draw the appropriate divs in the game area.
 */
const drawBoard = (tiles, $target) => {
  for (let x = 0; x < tiles.length; x++) {
    // Create a lower-case letter, starting with 'a' at 0
    const rowChar = String.fromCharCode(x + 97);
    const $rowDiv = $('<div class="row"/>');
    for (let y = 0; y < tiles[x].length; y++) {
      const $tileDiv = $(`<div id="${rowChar}${y}" class="tile">${tiles[x][y]}</div>`);
      $rowDiv.append($tileDiv);
    }
    $target.append($rowDiv);
  };

};

const addUserEntry = (user, $destination) => {
  const $userEntry = $('<li>').attr('id', user.id).text(user.username);
  $destination.append($userEntry);
};

const addGameEntry = (id, $destination) => {
  const $gameEntry = $('<li class="gameEntry">').attr('id', id).text(id);
  $destination.append($gameEntry);
};