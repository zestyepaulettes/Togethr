var Sequelize = require('sequelize');
var db = require('../config/db');

//define models
var User = db.define('User', {
  facebookID: {
    type: Sequelize.STRING,
    unique: true
  },
  displayName: Sequelize.STRING,
  email: Sequelize.STRING,
  phoneNum: Sequelize.STRING,
  photoUrl: Sequelize.STRING
});

var User_Friends = db.define('Friends', {
  userFacebookID: Sequelize.STRING,
  friendFacebookID: Sequelize.STRING
});

var Event = db.define('Event', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.DATE,
  location: Sequelize.STRING,
  hostId: Sequelize.INTEGER,
  total: Sequelize.FLOAT
});

var Item = db.define('Item', {
  name: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.FLOAT,
});

var User_Event = db.define('User_Event', {
  UserId: Sequelize.INTEGER,
  EventId: Sequelize.INTEGER
});

Event.hasMany(Item);
Item.belongsTo(Event);

User.hasMany(Item);
Item.belongsTo(User);


//set bi-directional associations
// User_Event.hasMany(User);
// User.belongsTo(User_Event);

// User_Event.hasMany(Event);
// Event.belongsTo(User_Event);

//create tables in MySql if they don't already exist
User.sync()
.then(function() {
  return Event.sync()
}).then(function() {
  return Item.sync();
}).then(function(){
  return User_Event.sync();
});


module.exports = {
  User: User,
  Event: Event,
  Item: Item,
  User_Event: User_Event
};