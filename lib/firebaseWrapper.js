module.exports = (function() {

  function firebaseWrapper(fb) {
    this.db = fb;
  }

  firebaseWrapper.prototype.createPledge = function(data) {
    var userDataRef = this.db.child(data.codewars_username);
    userDataRef.push(mergeData(data))
  }

  firebaseWrapper.prototype.registerPaid = function(username) {
    var userDataRef = this.db.child(username);
    userDataRef.limitToLast(1).once("value", function(snapshot) {
      var key = Object.keys(snapshot.val())[0];
      var pledgeRef = userDataRef.child(key);
      pledgeRef.update({ pledged: true });
    })
  }

  function mergeData(data) {
    data.benefactor = "Ted Cruz";
    data.due_data   = Date.now() + (1000 * 60 * 60 * 24 * 30);
    data.pledged    = false;

    return data
  }

  return firebaseWrapper
}());

var Firebase = require('Firebase');
var db = new Firebase("https://super-pact.firebaseio.com/pledges");

var fb = new module.exports(db);
//
// fb.createPledge(
//   {
//     amount: 10,
//     codewars_username: "ptolemybarnes",
//     description: "I will get to 100 points in Haskell",
//     language: "Haskell",
//     score: 100,
//     twitter: "@guacamolay"
//   }
// )

fb.registerPaid('ptolemybarnes');
