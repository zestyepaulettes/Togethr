var nodemailer = require('../config/nodemailer');
var GuestQuery = require('../queries/guestQueries');

module.exports = {
  get: function(req, res) {
    var eventID = req.params.eventID;
    var emails = '';
    var url = "http://localhost:3000/#/eventdetails/" + eventID;
    
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