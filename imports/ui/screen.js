import { Template } from 'meteor/templating';

import './screen.html';
import { Game } from '../lib/game.js';


Template.screen.onCreated(function() {
  // use Template subscription
  this.subscribe('action_states');

  // return actionStates values (last record)
  this.states = function() {
    return actionStates.findOne();
  }
});


Template.screen.onRendered(function() {

  // resets player values
  Meteor.call('reset_action_states');

  // initializes game
  var game = new Game(document.getElementsByTagName('canvas')[0], 600, 300); // create an instance of the game
  
  // starts game
  game.play(); 

  // reactive hook - waits for changes
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();

  // if data is received
  if (states != undefined) {
    // move squares according to player values
    game._player1._y = -(states.player1 * game._player1._speed);
    game._player2._y = -(states.player2 * game._player2._speed);
  }
});
  
});

Template.screen.helpers({
  states: function() {
    return Template.instance().states();
  }
});
