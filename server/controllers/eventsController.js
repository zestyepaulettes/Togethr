var EventQuery = require('../queries/eventQueries');
var GuestQuery = require('../queries/guestQueries');
var ItemQuery = require('../queries/itemQueries');
var BasketQuery = require('../queries/basketQueries');
var nodemailer = require('../config/nodemailer');

module.exports = {
  events: {
    get: function(req, res) {
      var userID = req.params.userID;
      console.log(userID);
      EventQuery.getAll(userID, function(events) {
        res.json(events);
      });
    },
    post: function (req, res) {
      var data = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        total: req.body.total
      };
      // Add event
      EventQuery.addOne(data)
      .then(function(data){
        res.json(data);
      })
      .catch(function(error){
        res.json(error);
      });
    }
  },

  eventDetails: {
    get: function(req, res) { //NOT RELEVANT, to be deleted
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
      ItemQuery.getAll(eventID, function(items) {
        data.items = items; // get event items
        checkQueries();
      });

      // check if all queries are done and return data in response
      function checkQueries() {
        if (Object.keys(data).length === 3) {
          res.json(data);
        }
      }
    },
    post: function(req, res){
      var eventID = req.params.eventID;
      var data = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        hostId: req.body.hostId,
        total: req.body.total
      };

      EventQuery.updateByID(data, eventID)
      .then(function(event){
        res.json(event);
      })
      .catch(function(error){
        console.error(error);
        res.json(error);
      });
    }
  }
};
