var ItemsQueries = require('../queries/itemsQueries');

module.exports = {

	getAll: function(req, res){
		var eventID = req.params.eventID; 
		ItemsQueries.getAllItems(eventID, function(items){
			res.json(items);
		});
	},

	addOne: function(req, res){
		var item = req.body.item; 
		ItemsQueries.addOneItem(item, function(newItem){
			res.json(newItem); 
		});

	},

	addAll: function(req, res){
		var items= req.body.items; 
		ItemsQueries.addAllItems(items, function(newItems){
			res.json(newItems);
		});
	}


};