import { Template } from 'meteor/templating';

import './player1.html';

Template.player1.onCreated(function() {
  // use Template subscription
  this.subscribe('action_states');

  // return actionStates values (last record)
  this.states = function() {
    return actionStates.findOne();
  }
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
  }
})