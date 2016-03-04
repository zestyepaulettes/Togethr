var ItemQuery = require('../queries/itemQueries');
var db = require('../models/models');

module.exports = {
	get: function(req, res) {
		var eventID = req.params.eventID;
		ItemQuery.getAll(eventID, function(items){
			res.json(items);
		});
	},
	 getItems: function(req, res) {
	  var eventId = req.params.eventId;
	  console.log(eventId);
	  db.Item.findAll({
	    where: {
	      EventId: eventId
	    }
	  })
	  .then(function(items) {
	    var itemArray = [];
	    // // console.log('this is users from server:',users);
		   //  for(var i = 0; i < items.length; i++) {
		   //    itemArray.push(items[i].dataValues);
		   //    console.log('this is itemArray',itemArray)
		   //  }
		      res.json(items);
	    });
	},

	post: function(req, res) {
		var items = req.body.items;
		var userid = req.body.userID;
		var eventid = req.body.eventID;
		var itemEntries = [];
		for(var i=0;i<items.length;i++) {
			itemEntries.push({
				name: items[i],
				UserId: userid,
				EventId: eventid
			});
		}
		db.Item.bulkCreate(itemEntries)
			.then(function () {
				res.json('SUCCESS');
		}).catch(function (error) {
				res.json(error);
		});
	},
//TODO ASSIGN ITEM TO HOST
	postOne: function(req, res) {
		var item = req.body.item;
		db.Item.create(item)
		.then(function () {
			res.json("Successfully added data!");
		}).catch(function (error) {
			res.json(error);
		});
	},
	put: function(req, res) {
		// console.log('making a put request when we drag items', req.params.itemID);
		// console.log('req.body in put', req.body);
		var itemID = req.params.itemID;
		var newAttrs = req.body;
		db.Item.update(newAttrs, {
			where:{
				id: itemID
			}
		})
		.then(function() {
			res.send(200);
		});
	},

	delete: function(req, res) {
		var itemID = req.params.itemID;
		ItemQuery.deleteOne(itemID, function(){
			res.send();
		});
	}
};
