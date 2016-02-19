var Sequelize = require('sequelize');
var db = require('../config/db');

//define models
var User = db.define('User', {
  facebookID: Sequelize.STRING,
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

//create tables in MySql if they don't already exist
User.sync();
Event.sync();
Guest.sync();
Basket.sync();
Item.sync();

//set bi-directional associations
Event.belongsTo(User);
User.hasMany(Event);

Guest.belongsTo(Event);
Event.hasMany(Guest);

Basket.belongsTo(Guest);
Guest.hasOne(Basket);

Item.belongsTo(Basket);
Basket.hasMany(Item);

module.exports = {
  User: User,
  Event: Event,
  Guest: Guest,
  Basket: Basket,
  Item: Item
};