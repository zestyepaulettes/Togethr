// Require sql models
var Item = require('../models/models.js').Item;
var Basket = require('../models/models.js').Basket;

module.exports = {
	//get all items for an event 
	getAll: function(eventID, callback) {
		Item
			.findAll({
				where: {eventId: eventID}
			})
			.then(function(items){
				callback(items);
			});

	},
	//add one item
	addOne: function(item, callback) {
		Item
			.create(item)
			.then(function(newItem){
				callback(newItem);
			});
		
	},
	//add multiple items to one event
	addAll: function(eventID, items, callback) {
		Basket
			.findAll({
				where: {EventId: eventID}
			})
			.then(function(baskets) {
				// Distribute items among baskets
				if (baskets.length) {
					for (var i=0, j = 0; i < items.length; i++, j++) {
						j = (j === baskets.length) ? 0 : j;
						items[i].EventId = eventID;
						items[i].BasketId = baskets[j].id;
					}
				}
				Item
					.bulkCreate(items)
					.then(function(newItems) {
						callback(newItems);
					});
			});
	},

	// update attributes of one item
	updateOne: function(itemID, newAttrs, callback) {
		Item
			.update(newAttrs, {
				where: {id: itemID}
			})
			.then(function() {
				callback();
			})
	},

	// delete one item
	deleteOne: function(itemID, callback) {
		Item
			.destroy({
				where: {id: itemID}
			})
			.then(function() {
				callback();
			})
	}
};