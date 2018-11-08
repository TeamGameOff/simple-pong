action_states = {};

// get a set for the indicators state
action_states.defaults = function() {
  return {
    player1: 0,
    player2: 0
  }
}

action_states.publish = function(action_states) {
  // publish data if active publisher
  // modify and send that data to the subscribers
  // we use undocumented API from meteor currently
  // TODO: Meteor API compatibility
  // see: http://stackoverflow.com/questions/31180799/meteor-get-all-subscriber-session-handles-for-a-publisher-method
  Meteor.server.stream_server.open_sockets.forEach(function(connection) {
    // make sure that we have _nameSubs object before iterate
    if (connection._meteorSession._namedSubs) {
      Object.values(connection._meteorSession._namedSubs).forEach(function(sub) {
        if (sub._name == "action_states") {
          sub.changed("action_states", "action_states", action_states);
        }
      });
    }
  });
}

// update indicators settings with new given values
action_states.update = function() {
  // publish data if active publisher
  this.publish(this.data);
}

// the active indicators state set
action_states.data = action_states.defaults();

// ***
// publisher
// ***

// create new publisher
Meteor.publish('action_states', function(){
  // append default record
  this.added("action_states", "action_states", action_states.data);
  // set ready
  this.ready();
});
