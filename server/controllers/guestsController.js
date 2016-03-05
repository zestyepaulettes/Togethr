var GuestQuery = require('../queries/guestQueries');
var db = require('../models/models');

module.exports = {
  get: function(req, res) { //NOT OURS, to be deleted
    var eventID = req.body.eventID;
    GuestQuery.getAll(eventID, function(guests) {
      res.json(guests);
    });
  },
   getGuests: function(req, res) {
    var eventId = req.params.eventId;
    // console.log(eventId);
    db.User_Event.findAll({
      where: {
        EventId: eventId
      }
    })
    .then(function(users) {
      var idArray = [];
      // console.log('this is users from server:',users);
      for(var i = 0; i < users.length; i++) {
        idArray.push(users[i].dataValues.UserId);

      }
      console.log('this is id array',idArray);
      db.User.findAll({
        where: {
          id: {
            $in: idArray,
          }
        }
      })
      .then(function(foundUsers) {
        res.json(foundUsers);
      });
    });
  },

  getFriends: function(req, res){
    var facebookIDs = req.query.facebookIDs;
    db.User.findAll({
      where: {
        facebookID: {
          $in: facebookIDs
        }
      }
    }).then(function(users){
      res.json(users);
    });
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
      // console.log(userEventEntries);
      return db.User_Event.bulkCreate(userEventEntries);
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

  put: function(req, res) { //TO BE DELETED
    var guestID = req.params.guestID;
    var newAttrs = req.body;
    GuestQuery.updateOne(guestID, newAttrs, function() {
      res.send();
    });
  },

  delete: function(req, res) { //TO BE DELETED
    var guestID = req.params.guestID;
    GuestQuery.deleteOne(guestID, function(){
      res.send();
    });
  }
};
