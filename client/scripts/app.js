var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};
app.init = function() { };
app.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: chats received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive chats', data);
    }
  });
};
app.clearMessages = function() {
  $('#chats').empty();
};
app.renderMessage = function (message) {
  $('#chats').append(`<div>${message.text}</div>`);
};
app.renderRoom = function (name) {
  $('#roomSelect').append(`<div>${name}</div>`);
};
