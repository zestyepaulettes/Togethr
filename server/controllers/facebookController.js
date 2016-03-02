var EventQuery = require('../queries/facebookQueries');

module.exports = {
  friends: {
    get: function(req, res) {
      facebookQueries.getAll(userID, function(events) {
        res.json(events);
      })
    }
  },
};