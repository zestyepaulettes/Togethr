var EventQuery = require('../queries/eventQueries');
var GuestQuery = require('../queries/guestQueries');
var ItemQuery = require('../queries/itemQueries');
var BasketQuery = require('../queries/basketQueries');
var nodemailer = require('../config/nodemailer');
var db = require('../models/models');

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
    get: function(req, res) {
      // Pull eventID from request params
      var eventID = req.params.eventID;
      db.Event.find({
        where: {
          id: eventID
        }
      }).then(function (event) {
        console.log("current event is ", event.dataValues);
        res.json(event.dataValues);
      }).catch(function(error) {
        console.log("error in eventdetails get req!");
      });
    },
    post: function(req, res){
      console.log('-----------we got req.body on post', req.body);
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
