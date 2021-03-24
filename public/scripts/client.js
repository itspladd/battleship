$( document ).ready( function() {
  const socket = io();
  const $game = $('#game');
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
  const drawBoard = board => {

    const $boardDiv = $('.board');

    for (const row of board.tiles) {
      const $rowDiv = $('<div class="row"/>');
      for (const tile of row) {
        const $tileDiv = $(`<div class="tile">${tile}</div>`);
        $rowDiv.append($tileDiv);
      }
      $boardDiv.append($rowDiv);
    }
  };
});