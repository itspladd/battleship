const socket = io();
const game = document.getElementById('game');
const refresh = document.getElementById('refresh');
const login = document.getElementById('loginForm')
const nameField = document.getElementById('inputName');

refresh.addEventListener('submit', (event) => {
  event.preventDefault();
  game.innerHTML = '<h1>HOWDY</h1>';
})

login.addEventListener('submit', (event) => {
  event.preventDefault();
  username = nameField.value;
  if (username) {
    socket.emit('user login', username);
  }
})

game.innerHTML = '<strong>hi</strong>';