var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'beerandchip@gmail.com',
      pass: 'zygote123'
    }
  });

exports.createMailOptions = function(receivers, eventDetailsURL) {
  return {
    from: '"BeerOrChip" <beerandchip@gmail.com>', // sender address
    to: receivers, // list of receivers
    subject: 'Event Information!', // Subject line
    text: eventDetailsURL
  }
};
