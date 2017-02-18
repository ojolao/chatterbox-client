var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};
app.rooms = new Set();
app.currentRoom = 'lobby';
app.init = function() { 
  $('#send').submit(function(event) {
    event.preventDefault();
    app.handleSubmit();
  });
  app.fetch();
  setInterval(function() {
    app.clearMessages();
    app.fetch();
  }, 15000); //how to get it to not blink?
  $('#roomSelect').on('change', function() {
    console.log(app.currentRoom);
    app.currentRoom = $('#roomSelect option:selected').text();
    app.clearMessages();
    app.fetch();
  });
};
app.send = function (message) {
  $.ajax({
    url: app.server,
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
    url: app.server + '?order=-createdAt', 
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: chats received');
      //console.log(data.results);
      var messages = data.results;
      messages.forEach(function(message) {
        // If the message has the same roomname as the room we're in
        // we will render the message on screen
        if (message.roomname === app.currentRoom) {
          app.renderMessage(message);
        }
        app.rooms.add(message.roomname); 
      });
      $('#roomSelect').find('option').remove();
      app.rooms.forEach(function(room, key) {
        $('#roomSelect').append($('<option></option>').attr('value', key).text(room));
      });
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
app.renderMessage = function (messageObj) {
  var escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  var escapedText = escapeHtml(messageObj.text);
  var escapedUsername = escapeHtml(messageObj.username);
  $('#chats').append(`<div><span class='username' onClick="app.handleUsernameClick()">${escapedUsername}</span>: ${escapedText}</div>`);
};
app.renderRoom = function (name) {
  $('#roomSelect').append(`<div>${name}</div>`);
};

app.handleUsernameClick = function() {
  // add friend to current user's friend list
  console.log('hi friend');
};

app.handleSubmit = function() {
  var message = {
    roomname: app.currentRoom,
    username: window.location.search.slice(10), //should we escape the username for server security?
    text: $('#message').val()
  };
  console.log(message);
  app.send(message);
  location.reload();
  console.log('submitting');
};

$(document).ready(function() {
  app.init();
});