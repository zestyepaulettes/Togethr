module.exports = {
	addOne: function (req, res){
		console.log("REQUEST Body", req.body);

		res.status(201).send("WORKS!");
	}
}