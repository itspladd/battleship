$( document ).ready( function() {
  const socket = io();
  const $game = $('#game');
  const $board = $('.board');
  const $users = $('#users');
  const $startGame = $('#stepForward');
  const $login = $('#loginForm');
  const $register = $('#register');
  const $nameField = $('#inputName');
  const devTools = initDevTools(socket);



  $startGame.click(event => {
    event.preventDefault();
    socket.emit('step forward');
  })
  
  $login.submit(event => {
    event.preventDefault();
    username = $nameField.val();
    if (username) {
      socket.emit('login attempt', username);
    }
  });

  $register.click(event => {
    event.preventDefault();
    const username = $nameField.val();
    if (username) {
      socket.emit('registration attempt', { username });
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
    $login.hide();
  });

  socket.on('registration successful', () => {
    console.log('Successfully registered!');
  });
  
  socket.on('board update', tiles => {
    drawBoard(tiles, $board);
  });

  socket.on('tracked', () => alert('tracked!'));

});