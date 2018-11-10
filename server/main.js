import { Meteor } from 'meteor/meteor';

import './action_states';

import http from 'http';
import socket_io from 'socket.io';

const SOCKET_PORT = 8080;

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Hallo Server');

  // Server
  const server = http.createServer();
  const io = socket_io(server);

  let counter = 0;

  // New client
  io.on('connection', function(socket) {
    console.log('new socket client');

    socket.on('player1', function(value){
      if (value > 0) {
        action_states.data.player1--;
      } else {
        action_states.data.player1++;
      }
      action_states.update();
    });

    socket.on('player1.inc', function(value){
      action_states.data.player1++;
    });

    socket.on('send_updates', function(value){
      action_states.update();
    });

  });

  // Start server
  try {
    server.listen(SOCKET_PORT, 'localhost');
  } catch (e) {
    console.error(e);
  }

});

Meteor.methods({
  'reset_action_states'() {
    action_states.data.player1 = 0;
    action_states.data.player2 = 0;
    action_states.update();
  },
  'send_updates'() {
    action_states.update();
  },
  'player1.inc'() {
    action_states.data.player1++;
  },
  'player1.dec'() {
    action_states.data.player1--;
  },
  'player1.upwards'() {
    action_states.data.player1--;
    action_states.update();
  },
  'player1.downwards'() {
    action_states.data.player1++;
    action_states.update();
  },
  'player2.upwards'() {
    action_states.data.player2--;
    action_states.update();
  },
  'player2.downwards'() {
    action_states.data.player2++;
    action_states.update();
  },
});
