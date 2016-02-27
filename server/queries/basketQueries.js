var Basket = require('../models/models').Basket;
var GuestQuery = require('./guestQueries');

module.exports = {
  // Create/assign a basket for each guest at the event
  addAll: function(eventID, callback) {
    var baskets = [];
    GuestQuery.getAll(eventID, function(guests) {
      for (var i = 0; i < guests.length; i++) {
        baskets.push({ 
          EventId: eventID, 
          GuestId: guests[i].id
        });
      }
      Basket
        .bulkCreate(baskets)
        .then(function(newBaskets) {
          callback(newBaskets);
        });   
    });
  },

  addOne: function(eventID, guestID, callback) {
    Basket
      .create({
        EventId: eventID,
        GuestId:guestID 
      })
      .then(function(newBasket) {
        callback(newBasket);
      });
  },

  getAll: function(eventID, callback) {
    Basket
      .findAll({
        where: {EventId: eventID}
      })
      .then(function(baskets) {
        callback(baskets);
      });
  },
}