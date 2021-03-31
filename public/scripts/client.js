$( document ).ready( function() {
  const socket = io();
  const $game = $('#game');
  const $board = $('.board');
  const $users = $('#users');
  const $startGame = $('#stepForward');
  const $login = $('#loginForm');
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

  socket.on('user list', userList => {
    Object.values(userList).forEach(user => {
      addUserEntry(user, $users)
    });
  });
  
  socket.on('user joined', player => {
    addUserEntry(player, $users)
  });
  
  // Remove the item with the ID of the player's username
  socket.on('user left', user => {
    console.log(`removing #${user.id}`)
    $(`#${user.id}`).remove();
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