import { Template } from 'meteor/templating';

import './player1.html';

// Socket io client
const SOCKET_PORT = 8080;

Template.player1.onCreated(function() {
  // use Template subscription
  this.subscribe('action_states');

  // return actionStates values (last record)
  this.states = function() {
    return actionStates.findOne();
  }

  // initialize sockets
  this.socket = require('socket.io-client')(`http://localhost:${SOCKET_PORT}`);

  this.socket.on('connect', function() {
    console.log('Client connected');
  });

  this.socket.on('disconnect', function() {
    console.log('Client disconnected');
  });
});

Template.player1.onRendered(function() {
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();
  });
});

Template.player1.helpers({
  states: function() {
    return Template.instance().states();
  }
});

Template.player1.events({
  'click #upwards'(event) {
    Meteor.call('player1.upwards');
  },
  'click #downwards'(event) {
    Meteor.call('player1.downwards');
  },
  'click #sockets_upwards'(event) {
    Template.instance().socket.emit('player1',1);
  },
  'click #sockets_downwards'(event) {
    Template.instance().socket.emit('player1',-1);
  }
})