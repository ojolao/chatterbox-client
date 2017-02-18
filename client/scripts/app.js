var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};
app.init = function() { 
  this.fetch();
};
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
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: chats received');
      console.log(data);
      var messages = data.results;
      messages.forEach(function(message) {
        app.renderMessage(message);
      });
      //messages.forEach(this.renderMessage(message));
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
  // console.log('hi friend');
};

app.handleSubmit = function() {
  console.log('submitting');
};



app.init();