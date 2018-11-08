import { Template } from 'meteor/templating';

import './player2.html';

Template.player2.onCreated(function() {
  // use Template subscription
  this.subscribe('action_states');

  // return actionStates values (last record)
  this.states = function() {
    return actionStates.findOne();
  }
});

Template.player2.onRendered(function() {
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();
  });
});

Template.player2.helpers({
  states: function() {
    return Template.instance().states();
  }
});

Template.player2.events({
  'click #upwards'(event) {
    Meteor.call('player2.upwards');
  },
  'click #downwards'(event) {
    Meteor.call('player2.downwards');
  }
})