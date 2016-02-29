// Require sql model
var Guest = require('../models/models').Guest;

module.exports = {
  // get all guests from an event
  getAll: function(eventID, callback) {
	  Guest
	    .findAll({
	  	  where: {EventId: eventID}
	    })
	    .then(function(guests) {
	  	  callback(guests);
	    });
  },

  // add one guest
  addOne: function(guest, callback) {
    Guest
	    .create(guest)
	    .then(function(newGuest) {
	    	callback(newGuest);
	    });
  },

  // add multiple guests to one event
  addAll: function(eventID, guests, callback) {
    for (var i=0; i < guests.length; i++) {
    	guests[i].EventId = eventID;
    }

    Guest
	    .bulkCreate(guests)
	    .then(function(newGuests) {
	  	  callback(newGuests);
	    });
  },

  // update attributes of one guest
  updateOne: function(guestID, newAttrs, callback) {
    Guest
      .update(newAttrs, {
        where: {id: guestID}
      })
      .then(function() {
        callback();
      })
  },

  // delete one guest
  deleteOne: function(guestID, callback) {
    Guest
      .destroy({
        where: {id: guestID}
      })
      .then(function() {
        callback();
      })
  }
};