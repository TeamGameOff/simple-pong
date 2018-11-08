import { Template } from 'meteor/templating';

import './benchmark.html';

// Socket io client
const SOCKET_PORT = 8080;

var bench_timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Benchmark timer:', name, 'finished in', time, 'ms');
        }
    }
};

Template.benchmark.onCreated(function() {
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

Template.benchmark.onRendered(function() {
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();
  });
});

Template.benchmark.helpers({
  states: function() {
    return Template.instance().states();
  }
});

Template.benchmark.events({
  'click #bench1k'(event) {
    var t = bench_timer('meteor_bench1k');
    for (i = 0; i < 1000; i++) {
      Meteor.call('player1.inc');
      Meteor.call('send_updates');
    }
    t.stop();
  },
  'click #bench10k'(event) {
    var t = bench_timer('meteor_bench10k');
    for (i = 0; i < 10000; i++) {
      Meteor.call('player1.inc');
      Meteor.call('send_updates');
    }
    t.stop();
  },
  'click #bench100k'(event) {
    var t = bench_timer('meteor_bench100k');
    for (i = 0; i < 100000; i++) {
      Meteor.call('player1.inc');
      Meteor.call('send_updates');
    }
    t.stop();
  },
  'click #sockets_bench1k'(event) {
    var t = bench_timer('sockets_bench1k');
    var l_socket = Template.instance().socket;
    for (i = 0; i < 1000; i++) {
      l_socket.emit('player1.inc',1);
      l_socket.emit('send_updates',1);
    }
    t.stop();
  },
  'click #sockets_bench10k'(event) {
    var t = bench_timer('sockets_bench10k');
    var l_socket = Template.instance().socket;
    for (i = 0; i < 10000; i++) {
      l_socket.emit('player1.inc',1);
      l_socket.emit('send_updates',1);
    }
    t.stop();
  },
  'click #sockets_bench100k'(event) {
    var t = bench_timer('sockets_bench100k');
    var l_socket = Template.instance().socket;
    for (i = 0; i < 100000; i++) {
      l_socket.emit('player1.inc',1);
      l_socket.emit('send_updates',1);
    }
    t.stop();
  }
})
