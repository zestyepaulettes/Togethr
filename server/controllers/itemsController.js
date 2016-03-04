var ItemQuery = require('../queries/itemQueries');
var db = require('../models/models');

module.exports = {
	get: function(req, res) {
		var eventID = req.params.eventID; 
		ItemQuery.getAll(eventID, function(items){
			res.json(items);
		});
	},

	post: function(req, res) {
		console.log("inside itemsController POST req ", req.body);
		var items = req.body.items;
		var userid = req.body.userID;
		var eventid = req.body.eventID;
		var itemEntries = [];
		console.log(items, userid, eventid);
		for(var i=0;i<items.length;i++) {
			itemEntries.push({
				name: items[i],
				UserId: userid,
				EventId: eventid
			})
		}
		console.log(itemEntries);
		db.Item.bulkCreate(itemEntries)
			.then(function () {
				res.json('SUCCESS');
		}).catch(function (error) {
				res.json(error);
		});
	},

	put: function(req, res) {
		console.log("PUT request for add item ", req.body.item);
		var item = req.body.item;
		db.Item.create(item)
		.then(function () {
			res.json("Successfully added data!");
		}).catch(function (error) {
			res.json(error);
		});
	},

	delete: function(req, res) {
		var itemID = req.params.itemID; 
		ItemQuery.deleteOne(itemID, function(){
			res.send();
		});
	}
}