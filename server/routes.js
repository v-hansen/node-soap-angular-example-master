/* Routes */

/* dependencies */
var   _         = require('underscore'),
    path        = require('path'),
    passport    = require('passport'),
    AuthCtrl    = require('./api/auth'),
    SearchCtrl  = require('./api/search');

/* config */
var routes = [
  {
    path      : '/partials/*',
    httpMethod: 'GET',
    middleware: [getView]
  },
  {
    path      : '/login',
    httpMethod: 'POST',
    middleware: [AuthCtrl.login]
  },
  {
    path      : '/logout',
    httpMethod: 'POST',
    middleware: [AuthCtrl.logout]
  },
  {
    path      : '/api/get',
    httpMethod: 'GET',
    middleware: [SearchCtrl.get]
  },
  {
    path      : '/*',
    httpMethod: 'GET',
    middleware: [loginRequired]
  }
];

/* assign methods and middleware functions */
module.exports = function(app) {
  _.each(routes, function(route) {
    var args = _.flatten([route.path, route.middleware]);

      switch(route.httpMethod.toUpperCase()) {
        case 'GET':
          app.get.apply(app, args);
          break;
        case 'POST':
          app.post.apply(app, args);
          break;
        case 'PUT':
          app.put.apply(app, args);
          break;
        case 'DELETE':
          app.delete.apply(app, args);
          break;
        default:
          throw new Error('Invalid HTTP method specified for route ' + route.path);
          break;
      }
  });
};

/* serving templates */
function getView(req, res) {
  var requestedView = path.join('./', req.url);
  res.render(requestedView);
}

/* check if user is logged in on every route change */
function loginRequired(req, res) {
  var user = '';
  if (req.user) {
    user = req.user;
  }
  res.cookie('user', JSON.stringify(user));
  res.render('index');
}