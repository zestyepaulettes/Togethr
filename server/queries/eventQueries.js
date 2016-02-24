var Event = require('../models/models').Event;
var UserQueries = require('./UserQueries');

module.exports = {
// create and add one event and passes the new event to a callback
  addOne: function(userID, event, callback) {
    event.userID = userID;
  	Event
  	  .create(event)
  	  .then(function(newEvent) {
  	  	callback(newEvent.id);
  	  });
  },

// passes all events from a user to a callback
  getAll: function(userID, callback) {
  	Event
  		.findAll({
  	    where: {userId: userID}
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