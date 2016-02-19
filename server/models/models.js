var db = require('../config/db');

//define models
var Host = db.define('Host', {
  email: Sequelize.STRING
});

var Event = db.define('Event', {
  name: Sequelize.STRING,
  date: Sequelize.DATE
});

var Guest = db.define('Guest', {
  name: Sequelize.STRING
});

var Basket = db.define('Basket', {

});

var Item = db.define('Item', {

});


//set bi-directional associations
Event.belongsTo(Host);
Host.hasMany(Event);

Guest.belongsTo(Event);
Event.hasMany(Guest);

Basket.belongsTo(Guest);
Guest.belongsTo(Basket);

Item.belongsTo(Basket);
Basket.hasMany(Item);




//create tables in MySql if they don't already exist
Host.sync();
Event.sync();
Guest.sync();
Basket.sync();
Item.sync();


exports.Host = Host;
exports.Event = Event;
exports.Guest = Guest;
exports.Set = Set;
exports.Item = Item;

