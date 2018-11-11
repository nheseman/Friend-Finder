const friendsList = require("../data/friends");

module.exports = function(app){
	app.get("api/friends", function(req, res){
		res.json(friendsList);
	})

app.post("/api/friends", function(req, res) {
	var coPilot = req.body;
	var total = 0;
	var match = {
		name: "",
		photo: "",
		difference: 500	}

	
	for (var i = 0; i < friendsList.length; i++) {
		total = 0;

		for (var j = 0; j < friendsList[i].preferences.length; j++) {
			total += Math.abs(friendsList[i].preferences[j] - coPilot.preferences[j]);

			if (total <= match.difference) {
				match.name = friendsList[i].name,
				match.photo = friendsList[i].photo,
				match.difference = total
			}
    	}
    }
    friendsList.push(coPilot);
    res.json(match);
    console.log(match);
});
}