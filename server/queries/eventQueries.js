var db = require('../models/models');
var UserQueries = require('./userQueries');

module.exports = {
// create and add one db.Event and passes the new db.Event to a callback
  addOne: function(data) {
  	return db.Event.create(data);
  },

// passes all events from a user to a callback
  getAll: function(userID, callback) {
    db.User_Event.find({
      where: {
        UserId: userID
      }
    }).then(function(user_event){
      var eventIDs = [];
      if(user_event !== null){
        for(var i=0;i<user_event.length;i++){
          eventIDs.push(user_event[i].EventId);
        }
      }
    	db.Event
    		.findAll({
      	    where: {
              $or: {
                hostId: userID,
                id: {
                  $in: eventIDs
              }
            }
          }
    	  })
    	  .then(function(events) {
          console.log('found EVENTS' + events.length);
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
  	  	callback(event);
  	  });
  },
  updateByID: function(data, ID){
    //find event
    return Event.find({
      where: {ID: ID}
    })  //update event with data
    .then(function(event){
      event.name = data.name;
      event.description = data.description;
      event.date = data.date;
      event.location = data.location;
      event.hostId = data.hostId;
      event.total = data.total;
      return event.save();
    });
  }
};