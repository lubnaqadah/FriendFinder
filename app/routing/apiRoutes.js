var data = require('../data/friends.js');


module.exports = function(app){

	app.get('/api/users', function(req, res){
		res.json(data.users);
	})
	app.post('/api/users', function(req, res){
		data.users.push(req.body);
	});

	app.get('/api/friends', function(req, res){
		res.json(data.allFriends);
	});

	app.post('/api/friends', function(req, res){
		
		var userScores = req.body.answers;
		var scoreDiff = 0;
		var minDiff = 100;
		var animal, image;
		console.log(req.body);
		console.log(JSON.parse(userScores));
		for (var i = 0; i < data.allFriends.length; i++){
			
			for (var j = 0; j < userScores.length; j++){
				scoreDiff += (Math.abs(data.allFriends[i].scores[j] - userScores[j]));
				if (scoreDiff < minDiff){
					minDiff = scoreDiff;
					animal = data.allFriends[i].animal;
					image = data.allFriends[i].photo;
				}
				
			}
			return minDiff, animal, image;
		}
		
		res.json(minDiff, animal, image);
	});

};

