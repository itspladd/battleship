$( document ).ready( function() {
  const socket = io();
  const $game = $('#game');
  const $board = $('.board');
  const $users = $('#users');
  const $debug = $('#debug');
  const $login = $('#loginForm');
  const $nameField = $('#inputName');

  $debug.click(event => {
    event.preventDefault();
    socket.emit('request board update');
  });
  
  $login.submit(event => {
    event.preventDefault();
    username = $nameField.val();
    if (username) {
      socket.emit('login attempt', username);
    }
  });

  socket.on('user list', userList => {
    userList.forEach(username => {
      $users.append($(`<li id="${username}">${username}</li>`));
    });
  });
  
  socket.on('user joined', username => {
    $users.append($(`<li id="${username}">${username}</li>`));
  });
  
  socket.on('user left', username => {
    $(`#${username}`).remove();
  });

  // Remove login button once the client has successfully logged in
  socket.on('login successful', () => {
    $login.remove();
  });
  
  socket.on('board update', tiles => {
    drawBoard(tiles, $board);
  });

});