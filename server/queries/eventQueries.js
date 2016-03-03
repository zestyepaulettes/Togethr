var Event = require('../models/models').Event;
var UserQueries = require('./userQueries');

module.exports = {
// create and add one event and passes the new event to a callback
  addOne: function(data) {
  	return Event.create(data);
  },

// passes all events from a user to a callback
  getAll: function(userID, callback) {
  	Event
  		.findAll({
  	    where: {UserId: userID}
  	  })
  	  .then(function(events) {
  	    callback(events);
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
};