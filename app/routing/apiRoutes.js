var friendsData = require("../data/friends");

module.exports = function(app) {


  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var bestFriend = {
      name:"",
      photo:"",
      friendScore: 1000
    };

    var newFriend = req.body;
    var newName = newFriend.name;
    var newPhoto = newFriend.photo;
    var newScores = newFriend.scores; 
    var totalDiff = 0;

    for (var i=0; i<friendsData.length; i++){
      console.log(friendsData[i].name);
      totalDiff = 0;
      for (var x=0; x<10; x++){
        totalDiff += Math.abs(parseInt(newScores[x]) - parseInt(friendsData[i].scores[x]));
        if (totalDiff <= bestFriend.friendScore){
          bestFriend.name = friendsData[i].name;
          bestFriend.photo = friendsData[i].photo;
          bestFriend.friendScore = totalDiff;
        }
      }
    }

    friendsData.push(newFriend);

    res.json(bestFriend);
  });

};
 