import { Template } from 'meteor/templating';

import './screen.html';

Template.screen.onCreated(function() {
  // use Template subscription
  this.subscribe('action_states');

  // return actionStates values (last record)
  this.states = function() {
    return actionStates.findOne();
  }
});

Template.screen.onRendered(function() {
  this.autorun(function() {
    // get reactive values from subscription
    var states = actionStates.findOne();
  });
});

Template.screen.helpers({
  states: function() {
    return Template.instance().states();
  }
});
