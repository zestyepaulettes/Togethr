//we are going to have to require the sequelize models file
//specifically the items table 
var Item = require('../models/models.js').Item;


module.exports = {

	//get all items from the database 
	getAll: function(eventID, callback){
		Item
			.findAll({
				where: {eventId: eventID}
			})
			.then(function(items){
				callback(items);
			});

	},

	//add one item to data base 
	addOne: function(item, callback){
		Item
			.create(item)
			.then(function(newItem){
				callback(newItem);
			});
		
	},

	//add all items to database 
	addAll: function(eventID, items, callback){
		for (var i=0; i < items.length; i++) {
			items[i].EventId = eventID;
		}

		Item
			.bulkCreate(items)
			.then(function(newItems){
				//callback(newItems);
			});
	}
};