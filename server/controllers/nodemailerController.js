var nodemailer = require('../config/nodemailer');
var db = require('../models/models');

module.exports = {
  // Uses nodemailer to send out event details to guests
  get: function(req, res) {
    console.log('mail service made to controller!');
    var eventID = req.params.eventID;
    var emails = '';
    var url = "http://162.243.220.237:3000/#/eventdetails/" + eventID;
    var message = 'You\'ve been invited to an event! Click here for the link!';
    var toSend = {
    url : url,
    from: '"Togethr" <togethr@gmail.com>',
    subject: 'Event Information!',
    text: message + url
    };
    db.User_Event.findAll({
      where: {
        EventId: eventID
      }
    })
    .then(function(users) {
      var idArray = [];
      console.log('this is users from server:',users);
      for(var i = 0; i < users.length; i++) {
        idArray.push(users[i].dataValues.UserId);
      }
       db.User.findAll({
        where: {
          id: {
            $in: idArray,
          }
        }
      })
      .then(function(foundUsers) {
        console.log('this is data',foundUsers[0].dataValues);
        for(var i = 0; i < foundUsers.length; i++) {
          emails = emails + foundUsers[i].dataValues.email+ "," ;
        }
        // console.log('this is emails', emails);
        emails = emails.slice(0, emails.length - 2);
        toSend.to = emails;
        // nodemailer.transporter.sendMail(toSend, function(err, info) {
        //   if(err) {
        //     return console.error(err);
        //   }
        // });
      });
    });
  }
};

// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };
