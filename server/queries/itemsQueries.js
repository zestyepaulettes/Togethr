//we are going to have to require the sequelize models file
//specifically the items table 
var Items = require('../models/models.js').Item;


module.export = {

	//get all items from the database 
	getAllItems: function(eventID, callback){
		Items
			.findAll({
				where: {eventId: eventID}
			})
			.then(function(items){
				callback(items);
			});

	},

	//add one item to data base 
	addOneItem: function(item, callback){
		Items
			.create(item)
			.then(function(newItem){
				callback(newItem);
			});
		
	},

	//add all items to database 
	addAllItems: function(items, callback){
		Items
			.bulkCreate(items)
			.then(function(newItems){
				callback(newItems);
			});
	}



};



