var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'beerandchip@gmail.com',
      pass: 'zygote123'
    }
  });

exports.createMailOptions = function(receivers, eventDetailsURL) {
  var message = 'You\'ve been invited to an event! Click here for the link!';
  return {
    from: '"Togethr" <beerandchip@gmail.com>', // sender address
    to: receivers, // list of receivers
    subject: 'Event Information!', // Subject line
    text: message +eventDetailsURL
  };
};
