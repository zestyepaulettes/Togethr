var express = require('express');
var db = require('./models/models');

//middleware
var parser = require('body-parser');
var morgan = require('morgan');

//router
var router = require('./config/routes.js');

var app = express();
module.exports.app = app;

//set port and listen
app.set('port', 3000);

//logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

//set up routes
app.use('/api', router);

//serve client files
app.use(express.static(__dirname + '/../client'));

//if we are being rung directly, run the server
if(!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

