/* Server config */


/* dependencies */
var   express = require('express'),
     http     = require('http'),
     passport = require('passport'),
     path     = require('path'),
     User     = require('./server/api/auth.js'),
     app      = express(),
     server   = http.createServer(app);

/* config */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieSession({secret: 'secret', cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

/* routes config */
require('./server/routes.js')(app);

server.listen(app.get('port'), function(){
  console.log('Up and Running on port ' + app.get('port'));
});