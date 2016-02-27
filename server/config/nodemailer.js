var nodemailer = require('../server');


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'beerandchip@gmail.com',
    pass: 'zygote123'
  }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Cantillating Zygote 👥" <beerandchip@gmail.com>', // sender address
    to: 'alexsu91@gmail.com, beerandchip@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});