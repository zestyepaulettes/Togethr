var GuestQuery = require('../queries/guestQueries');
var db = require('../models/models');

module.exports = {
  get: function(req, res) {
    var eventID = req.body.eventID;
    GuestQuery.getAll(eventID, function(guests) {
      res.json(guests);
    })
  },

  post: function(req, res) {
    var guests = req.body.guests;
    var eventId = req.body.eventId;
    var guestId = guests[0].id;
    var guestIDs = []; //array of user ids
    db.User.find({
      where: { facebookID: guestId }
    })
    .then(function(user){
      return db.User_Event.findOrCreate({
        where: { UserId: user.id },
        defaults: { EventId: eventId }
      })
    })
    .then(function(){
      res.json('SUCCESS');
    })
    .catch(function(error){
      res.json(error);
    });
    // GuestQuery.addOne(guest, function(newGuest) {
    //   res.json(newGuest);
    // });
  },

  put: function(req, res) {
    var guestID = req.params.guestID;
    var newAttrs = req.body;
    GuestQuery.updateOne(guestID, newAttrs, function() {
      res.send();
    })
  },

  delete: function(req, res) {
    var guestID = req.params.guestID; 
    GuestQuery.deleteOne(guestID, function(){
      res.send();
    });
  }
}