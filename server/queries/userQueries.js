var User = require(../models/models).User;

module.exports = {
  addOne: function(newUser) {
    // TODO: MOVE FROM server.js 
  },

  getByFacebookID: function(facebookID, callback) {
    User
      .findOne({
      	where: {facebookID: facebookID},
      })
      .then(function(user) {
      	callback(user);
      });
  } 
}