var request = require("request");
const createFirebaseClient = require('./firebaseWrapper.js');
const firebaseClient = new createFirebaseClient();
const filterPledgesDueToday = require("./pledgeFeedReader").filterPledgesDueToday;

function pledgeJudger(userData, callback) {
  var username = userData.codewars_username;
  var options = {
    url: endpointFor(username)
  }
  request(options, function(_, response, body) {
    var scores = JSON.parse(body);
    var language = userData.language.toLowerCase();
    var score  = scores.ranks.languages[language].score;
    var isScoreGreaterThanTargetScore = (score > userData.score);
    if (isScoreGreaterThanTargetScore) {
      firebaseClient.setPledgeHonoured(userData.codewars_username);
    }
  })
}

function endpointFor(username) {
  return "https://www.codewars.com/api/v1/users/" + username
}

function judgeAndUpdateHonouredPledges() {
  var pledged = firebaseClient.getAllPledges(function(pledges) {
    var filteredPledges = filterPledgesDueToday(pledges);
    filteredPledges.forEach(function(data) {
      console.log(data);
      pledgeJudger(data)
    })
  })
}

judgeAndUpdateHonouredPledges();
