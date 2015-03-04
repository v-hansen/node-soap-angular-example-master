/* Auth API */

var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    soap          = require('soap'),
    soapUrl       = 'http://endpoint url';

module.exports = {
  /* Defining Passport documentation */
  localStrategy: new LocalStrategy(
    function(username, password, done) {
      var user;
      // SOAP Auth Example
      // soap.createClient(soapUrl, function(err, client) {
      //   client.getUser({username: username, password: password}, function(err, result) {
      //     if (err) {
      //       done(null, false, { message: 'Incorrect username.' });
      //     } else {
      //       user = result;
      //       return done(null, user);
      //     }
      //   });
      // });

      /* fake auth */
      if (username === 'user' && password === 'password') {
        user = username;
        return done(null, user);
      } else {
        done(null, false, { message: 'Incorrect username.' });
      }
    }
  ),

  /*  From documentation:
    * Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
    * In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
  */
  serializeUser: function(user, done) {
    done(null, user);
  },

  deserializeUser: function(user, done) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  },

  /* Handle login and send serialized user back to client */
  login: function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if(err)     { return next(err); }
      if(!user)   { return res.send(400); }

      req.logIn(user, function(err) {
        if(err) { return next(err); }
        if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
        res.json(200, user);
      });
    })(req, res, next);
  },

  /* Destroy session */
  logout: function(req, res) {
    req.logout();
    res.send(200);
  }
};