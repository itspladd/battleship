const socket = io();
const game = document.getElementById('game');
const users = document.getElementById('users');
const debug = document.getElementById('debug');
const login = document.getElementById('loginForm')
const nameField = document.getElementById('inputName');

debug.addEventListener('click', (event) => {
  event.preventDefault();
  game.innerHTML = '<h1>HOWDY</h1>';
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

socket.on('user joined', username => {
  users.appendChild(makeUserListItem(username));
});

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

game.innerHTML = '<strong>Game area</strong>';