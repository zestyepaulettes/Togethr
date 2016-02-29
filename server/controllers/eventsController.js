var EventQuery = require('../queries/eventQueries');
var GuestQuery = require('../queries/guestQueries');
var ItemQuery = require('../queries/itemQueries');
var BasketQuery = require('../queries/basketQueries');
var nodemailer = require('../config/nodemailer');

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
      EventQuery.addOne(data.userID, data.event, function(event) {
        // Add event's guests
        GuestQuery.addAll(event.id, data.guests, function() {
          // Add a basket for each guest
          BasketQuery.addAll(event.id, function() {
            // Add event's items, currently not assigned to a basket
            ItemQuery.addAll(event.id, data.items, function() {
              // End response and send nothing back
              res.send(); 
            });
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
        checkQueries();
      });
      GuestQuery.getAll(eventID, function(guests) {
        data.guests = guests; // get event guests
        checkQueries();
      });
      BasketQuery.getAll(eventID, function(baskets) {
        data.baskets = baskets; // get event baskets
        checkQueries();
      });
      ItemQuery.getAll(eventID, function(items) {
        data.items = items; // get event items
        checkQueries();
      });

      // check if all queries are done and return data in response
      function checkQueries() {
        if (Object.keys(data).length === 4) { 
          res.json(data);
        }
      }
    }
  }
};