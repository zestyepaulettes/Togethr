var EventQuery = require('../queries/facebookQueries');

module.exports = {
  friends: {
    get: function(req, res) {
      console.log('Inside controller');
      var userID = req.params.userID;
      EventQuery.getAll(userID, function(events) {
        res.json(events);
      })
    }
  },
};