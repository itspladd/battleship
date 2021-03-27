const initDevTools = function(socket) {

  const $debug_updateBoard = $('#debug_updateBoard');
  $debug_updateBoard.click(event => {
    event.preventDefault();
    socket.emit('request board update');
  });
};