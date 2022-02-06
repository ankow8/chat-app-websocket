const express = require('express');
const path = require('path');
const socket = require('socket.io');

const messages = [];
const users = [];

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  /*console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message and disconnect events \n');*/

  socket.on('join', (login) => {
    //console.log('New user logged with id - ' + socket.id);
    users.push(login);
    //console.log('Users: ', users);
    socket.broadcast.emit('newUser', {
        author: 'Chat Bot',
        content: `${login.name} has joined the conversation!`
    });
  });

  socket.on('message', (message) => {
    //console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    //console.log('User ' + socket.id + ' left this chat.');
    const user = users.find((user) => user.id == socket.id);
    const indexOfUser = users.indexOf(user);
    users.splice(indexOfUser, 1);
    if(user) {
      socket.broadcast.emit('removeUser', {
        author: 'Chat Bot',
        content: `${user ? user.name : 'User'} has left the conversation... :(`
      });
    };
  });
});
