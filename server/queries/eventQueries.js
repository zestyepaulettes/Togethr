var Event = require('../models/models').Event;
var UserQueries = require('./UserQueries');

module.exports = {
// create/add and return one event
  addOne: function(event) {
  	Event
  	  .create(event)
  	  .then(function(newEvent) {
  	  	callback(newEvent);
  	  });
  },

// passes all events from a user to a callback
  getAll: function(facebookID, callback) {
  	UserQueries.getByFacebookID(facebookID, function(user) {
  	  var userID = user.facebookID;
  	  Event
  	  	.findAll({
  	      where: {user_ID: userID}
  	    })
  	    .then(function(events) {
  	      callback(events);
  	    }); 
  	});
  },

// get event by ID and pass to a callback
  getByID: function(ID, callback) {
  	Event
  	  .find({
  	  	where: {ID: ID}
  	  })
  	  .then(function(event) {
  	  	callback(event)
  	  });
  }
}