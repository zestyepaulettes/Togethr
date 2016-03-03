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
    var guestIDs = []; //array of user ids
    for(var i=0;i<guests.length;i++){
      guestIDs.push(guests[i].id);
    }
    db.User.findAll({
      where: { 
        facebookID: {
          $in: guestIDs
        }
      }
    })
    .then(function(users){
      var userEventEntries = [];
      for(var i=0;i<users.length;i++){
        userEventEntries.push({
          UserId:users[i].dataValues.id,
          EventId: eventId
        });
      }
      console.log(userEventEntries);
      return db.User_Event.bulkCreate(userEventEntries)
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