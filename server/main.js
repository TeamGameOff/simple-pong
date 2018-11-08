import { Meteor } from 'meteor/meteor';

import './action_states';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Hallo Server');
});

Meteor.methods({
  'player1.upwards'() {
    action_states.data.player1++;
    action_states.update();
  },
  'player1.downwards'() {
    action_states.data.player1--;
    action_states.update();
  },
  'player2.upwards'() {
    action_states.data.player2++;
    action_states.update();
  },
  'player2.downwards'() {
    action_states.data.player2--;
    action_states.update();
  },
});
