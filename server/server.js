var express = require('express');
var db = require('./models/models');

//middleware
var parser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


//router
var router = require('./config/routes.js');

var app = express();
module.exports.app = app;

//set port and listen
app.set('port', 3000);

//logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

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

//auth
var User = db.User;
var FACEBOOK_APP_ID = '553060631520944';
var FACEBOOK_APP_SECRET = '6d6d7fe25752c6bb43490d4d915f42af';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile, '<---profile!!!!');
    User.findOrCreate({ where:{facebookID: profile.id, displayName: profile.displayName}})
      .spread(function (user, created) {
        return cb(null, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });





//if we are being rung directly, run the server
if(!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

