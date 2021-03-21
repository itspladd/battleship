const socket = io();
const game = document.getElementById('game');
const users = document.getElementById('users');
const refresh = document.getElementById('refresh');
const login = document.getElementById('loginForm')
const nameField = document.getElementById('inputName');

refresh.addEventListener('submit', (event) => {
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
})

socket.on('user joined', username => {
  users.appendChild(makeUserListItem(username));
});

const makeUserListItem = username => {
  const user = document.createElement('li');
  user.setAttribute('id', username);
  user.textContent = username;
  return user;
};

game.innerHTML = '<strong>hi</strong>';