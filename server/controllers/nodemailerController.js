var nodemailer = require('../config/nodemailer');
var GuestQuery = require('../queries/guestQueries');

module.exports = {
  // Uses nodemailer to send out event details to guests
  get: function(req, res) {
    var eventID = req.params.eventID;
    var emails = '';
    var url = "http://http://162.243.220.237:3000/#/eventdetails/" + eventID;
    
    // Get and format all guest emails for nodemailer
    GuestQuery.getAll(eventID, function(guests) {
      for (var i = 0; i < guests.length; i++) {
        emails = emails + guests[i].email + ' ,';
      }
      emails = emails.slice(0, emails.length - 2);
      var mailOptions = nodemailer.createMailOptions(emails, url);
      nodemailer.transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
          return console.error(err);
        }
        console.log('Message send: ' + info.response);
      })
    })
  } 
}