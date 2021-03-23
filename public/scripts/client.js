const socket = io();
const game = document.getElementById('game');
const users = document.getElementById('users');
const debug = document.getElementById('debug');
const login = document.getElementById('loginForm');
const nameField = document.getElementById('inputName');

debug.addEventListener('click', (event) => {
  event.preventDefault();
  const boardObj = { tiles: [
    ['1a', '1b', '1c'],
    ['2a', '2b', '2c'],
    ['3a', '3b', '3c']
  ] };
  drawBoard(boardObj)
});

login.addEventListener('submit', (event) => {
  event.preventDefault();
  username = nameField.value;
  if (username) {
    socket.emit('login attempt', username);
  }
});

socket.on('user list', userList => {
  userList.forEach(username => {
    users.appendChild(makeUserListItem(username));

  });
});

socket.on('login successful', () => {
  login.remove();
});

socket.on('user joined', username => {
  users.appendChild(makeUserListItem(username));
});

socket.on('user left', username => {
  document.getElementById(username).remove();
});

socket.on('board update', board => {
  drawBoard(board);
})

/***********************
 * HELPER FUNCTIONS
 ***********************/

/**
 * drawBoard
 * Given a Board object, draw the appropriate divs in the game area.
 */
const drawBoard = boardObj => {

  const board = document.getElementById('board');

  for (const row of boardObj.tiles) {
    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');
    for (const tile of row) {
      const tileDiv = document.createElement('div');
      tileDiv.setAttribute('class', 'col bg-info');
      tileDiv.innerHTML = tile;
      rowDiv.appendChild(tileDiv);
    }
    board.appendChild(rowDiv);
  }
};

/**
 * makeUserListItem
 * Helper function that adds an 'li' element to the Users list given a username 
 */

const makeUserListItem = username => {
  const user = document.createElement('li');
  user.setAttribute('id', username);
  user.setAttribute('class', 'list-group-item');
  user.textContent = username;
  return user;
};