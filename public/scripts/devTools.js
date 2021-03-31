const initDevTools = function(socket) {

  const $debug_register = $('#debug_register');
  const $debug_startGame = $('#debug_startGame');
  const $debug_updateBoard = $('#debug_updateBoard');
  const $debug_login1 = $('#debug_login1');
  const $debug_login2 = $('#debug_login2');

  $debug_updateBoard.click(event => {
    event.preventDefault();
    socket.emit('request board update');
  });

  $debug_startGame.click(event => {
    event.preventDefault();
    socket.emit('new game');
  });

  $debug_register.click(event => {
    event.preventDefault();
    const username = $nameField.val();
    if (username) {
      socket.emit('registration attempt', { username });
    }
  });

  $debug_login1.click(event => {
    event.preventDefault();
    username = 'Pladd';
    if (username) {
      socket.emit('login attempt', username);
    }
  });

  $debug_login2.click(event => {
    event.preventDefault();
    username = 'Trapezius';
    if (username) {
      socket.emit('login attempt', username);
    }
  })
};