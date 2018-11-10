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

  // player Werte auf 0 setzen
  Meteor.call('reset_action_states');

  // Game Oberfläche initialisieren
  var game = new Game(document.getElementsByTagName('canvas')[0], 300, 300); // create an instance of the game

  // Spiel starten
  game.play(); // start it

  // Reactive Hook - wartet auf Änderungen
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();

    // sofern daten empfangen wurden
    if (states != undefined) {
      // setze Quadrat anhand der Spieler Werte
      game._player._x = states.player1 * game._player._speed;
      game._player._y = states.player2 * game._player._speed;
    }
  });

});


Template.screen.helpers({
  states: function() {
    return Template.instance().states();
  }
});
