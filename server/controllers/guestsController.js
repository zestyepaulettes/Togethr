var GuestQuery = require('../queries/guestQueries');

module.exports = {
  get: function(req, res) {
    var eventID = req.body.eventID;
    GuestQuery.getAll(eventID, function(guests) {
      res.json(guests);
    })
  },

  post: function(req, res) {
    var guest = req.body.guest;
    GuestQuery.addOne(guest, function(newGuest) {
      res.json(newGuest);
    });
  }
}
