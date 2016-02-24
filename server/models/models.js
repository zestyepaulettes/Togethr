var Sequelize = require('sequelize');
var db = require('../config/db');

//define models
var User = db.define('User', {
  facebookID: {
    type: Sequelize.STRING,
    unique: true
  },
  displayName: Sequelize.STRING,
  email: Sequelize.STRING
});

var Event = db.define('Event', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.DATE,
  location: Sequelize.STRING
});

var Guest = db.define('Guest', {
  name: Sequelize.STRING
});

var Basket = db.define('Basket', {
  name: Sequelize.STRING
});

var Item = db.define('Item', {
  name: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.FLOAT
});


//set bi-directional associations
User.hasMany(Event);
Event.belongsTo(User);

Event.hasMany(Guest);
Guest.belongsTo(Event);

Event.hasMany(Item);
Item.belongsTo(Event);

Event.hasMany(Basket);
Basket.belongsTo(Event);

Guest.hasOne(Basket);
Basket.belongsTo(Guest);

Basket.hasMany(Item);
Item.belongsTo(Basket);

//create tables in MySql if they don't already exist
User.sync()
  .then(function() {
    Event.sync()
      .then(function() {
        Guest.sync()
          .then(function() {
            Basket.sync()
              .then(function() {
                Item.sync();
              });
          });
      });
  });


module.exports = {
  User: User,
  Event: Event,
  Guest: Guest,
  Basket: Basket,
  Item: Item
};