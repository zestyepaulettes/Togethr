var EventQuery = require('../queries/eventQueries');
var GuestQuery = require('../queries/guestQueries');
var ItemQuery = require('../queries/itemQueries');
var BasketQuery = require('../queries/basketQueries');

module.exports = {
  events: {
    get: function(req, res) {
      var userID = req.params.userID;
      EventQuery.getAll(userID, function(events) {
        res.json(events);
      })
    },
    post: function (req, res) {
      var data = {
        userID: req.body.userID,
        event: req.body.event,
        guests: req.body.guests,
        items: req.body.items
      };
      // Add event
      EventQuery.addOne(data.userID, data.event, function(eventID) {
        // Add event's items, currently not assigned to a basket
        ItemQuery.addAll(eventID, data.items);
        // Add event's guests
        GuestQuery.addAll(eventID, data.guests, function(guests) {
          // Add a basket for each guest
          BasketQuery.addAll(eventID, guests, function() {
            // End response and send nothing back
            res.send(); 
          });
        }); 
      });
    }
  },

  eventDetails: {
    get: function(req, res) {
      // Pull eventID from request params 
      var eventID = req.params.eventID;
      var data = {}; // will hold response data

      EventQuery.getByID(eventID, function(event) {
        data.event = event; // get event
        if (Object.keys(data).length === 4) {
          res.json(data);
        }
      });
      GuestQuery.getAll(eventID, function(guests) {
        data.guests = guests; // get event guests
        if (Object.keys(data).length === 4) {
          res.json(data);
        }
      });
      BasketQuery.getAll(eventID, function(baskets) {
        data.baskets = baskets; // get event baskets
        if (Object.keys(data).length === 4) {
          res.json(data);
        }
      });

      ItemQuery.getAll(eventID, function(items) {
        data.items = items; // get event items
        if (Object.keys(data).length === 4) {
          res.json(data);
        }
      });
    }
  }
};