//require the guestQueries
var GuestQueries = require('../queries/guestQueries'); 

//module export the following: 

//when the server gets a get request to a certain endpoint
//say get all guests because you are reloading the page


module.exports = {

	getAll: function(req, res){
		var eventID = req.body.eventID;
		//run the getAll Queries from the data base
		GuestQueries.getAll(eventID, function(guests){

			res.json(guests); 
		});

	},

	addOne: function(req, res){
		//get the name of the person from the body
		var guest = req.body.guest;
		Guest.addOne(guest, function(newGuest){
			res.json(newGuest);
			//guest and new guest should be the same value
			//but newGuest is coming from the server
			//after being saved from the client
		});
	},

	//*****THIS METHOD IS FOR THE EVENTS GET REQUEST TO RUN
	addAll: function(req, res){
		var guests = req.body.guests;
		Guests.addAll(guests, function(newGuests){
			res.json(newGuests);
		});
	}

};
