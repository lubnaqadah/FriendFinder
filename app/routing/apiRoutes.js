var data = require('../data/friends.js');


module.exports = function(app){

	app.get('/api/users', function(req, res){
		res.json(data.users);
	})
	//	app.post('/api/users', function(req, res){
	//		data.users.push(req.body);
	//	});

	app.get('/api/friends', function(req, res){
		res.json(data.allFriends);
	});

	app.post('/api/users', function(req, res){
		data.users.push(req.body);


		var userScores = req.body.answers;

		var minDiff = 1000;
		var animal, image;
		var bestMatch = new Object();

		for (var i = 0; i < data.allFriends.length; i++){
			var scoreDiff = 0;
			for (var j = 0; j < userScores.length; j++){
				scoreDiff += (Math.abs(data.allFriends[i].scores[j] - userScores[j]));
				
			}
		

			if (scoreDiff < minDiff){
				minDiff = scoreDiff;
				bestMatch.animal = data.allFriends[i].animal;
				bestMatch.image = data.allFriends[i].photo;
				
			}
		}

		res.send(bestMatch);
	});

};

