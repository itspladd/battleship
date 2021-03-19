const socket = io();
const game = document.getElementById('game');
const refresh = document.getElementById('refresh');

refresh.addEventListener('submit', (event) => {
  event.preventDefault();
  game.innerHTML = '<h1>HOWDY</h1>';
})



game.innerHTML = '<strong>hi</strong>';