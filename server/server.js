var express = require('express');
var db = require('./models/models');

//facebook keys
var keys = require('./keys');

//middleware
var parser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jwt-simple');
var cookieParser = require('cookie-parser');

//router
var router = require('./config/routes.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connect', function(socket){
  socket.on('reassign', function(msg){
    io.emit('updateItems', msg);
  });
});

//set port and listen
var port = 3000;
http.listen(port, function(){
  console.log('Listening on port:' + port);
});

//logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());

//set up routes
app.use('/api', router);

//serve client files
app.use(express.static(__dirname + '/../client'));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/***** FACEBOOK AUTH *****/
var User = db.User;
var User_Friends = db.User_Friends;

passport.use(new FacebookStrategy({
    clientID: keys.FB_APP_ID,
    clientSecret: keys.FB_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName','email', 'cover', 'friends', 'picture.height(150).width(150)']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    process.nextTick(function() {
      // User_Friends.bulkCreate(profile._json.friends)
      // .then(function())
      User.findOrCreate({
        where:{
          facebookID: profile.id
        },
        defaults:{
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value
        }
      })
      .spread(function (user, created) {
        user.accessToken = accessToken;
        user.save();
        return cb(null, user);
      });
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook', {scope: ['email','user_friends']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('userID', req.user.id);
    res.cookie('facebookID', req.user.facebookID);
    res.cookie('displayName', req.user.displayName);
    res.cookie('email', req.user.email);
    res.redirect('/');
  });

//if we are being rung directly, run the server
// if(!module.parent) {
//   app.listen(app.get('port'));
//   console.log('Listening on', app.get('port'));
// }

module.exports.app = app;