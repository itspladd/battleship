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
  if (nameField.value) {
    game.innerHTML = `<p>${nameField.value}</p>`;
  }
})

game.innerHTML = '<strong>hi</strong>';