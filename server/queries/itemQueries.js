//we are going to have to require the sequelize models file
//specifically the items table 
var Item = require('../models/models.js').Item;
var Basket = require('../models/models.js').Basket;


module.exports = {
	//get all items from the database 
	getAll: function(eventID, callback) {
		Item
			.findAll({
				where: {eventId: eventID}
			})
			.then(function(items){
				callback(items);
			});

	},
	//add one item to database 
	addOne: function(item, callback) {
		Item
			.create(item)
			.then(function(newItem){
				callback(newItem);
			});
		
	},
	//add all items to database 
	addAll: function(eventID, items, callback) {
		Basket
			.findAll({
				where: {EventId: eventID}
			})
			.then(function(baskets) {
				// Distribute items among baskets
				if (baskets.length) {
					var j = 0;
					for (var i=0; i < items.length; i++) {
						j = (j === baskets.length) ? 0 : j;
						items[i].EventId = eventID;
						items[i].BasketId = baskets[j].id;
						j++;
					}
				}
				Item
					.bulkCreate(items)
					.then(function(newItems) {
						callback(newItems);
					});
			});
	}
};