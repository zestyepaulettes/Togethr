var GuestQuery = require('../queries/guestQueries');

module.exports = {
  get: function(req, res) {
    var eventID = req.body.eventID;
    GuestQuery.getAll(eventID, function(guests) {
      res.json(guests);
    })
  },

  post: function(req, res) {
    console.log("inside post req for guests ",req.body);
    var guest = req.body;
    GuestQuery.addOne(guest, function(newGuest) {
      res.json(newGuest);
    });
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