var EventQuery = require('../queries/eventQueries');

module.exports = {
  events: {
    get: function(req, res) {
      var facebookID = req.body.facebookID;
      EventQuery.getAll(facebookID, function(events) {
        res.json(events);
      })
    }, 
    post: function (req, res) {
      // TODO
    } 
  },

  eventDetails: {
    get: function(req, res) {
      // TODO
    }
  }
}