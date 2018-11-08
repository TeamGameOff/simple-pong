FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('start');
    }
});

FlowRouter.route('/benchmark', {
    action: function(params, queryParams) {
        BlazeLayout.render('benchmark');
    }
});

FlowRouter.route('/screen', {
    action: function(params, queryParams) {
        BlazeLayout.render('screen');
    }
});

FlowRouter.route('/player1', {
    action: function(params, queryParams) {
        BlazeLayout.render('player1');
    }
});

FlowRouter.route('/player2', {
    action: function(params, queryParams) {
        BlazeLayout.render('player2');
    }
});

