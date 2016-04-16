module.exports = (function() {

  function firebaseWrapper(fb) {
    this.db = fb;
  }

  firebaseWrapper.prototype.createPledge = function(data) {
    var userDataRef = this.db.child(data.codewars_username);
    userDataRef.push(mergeData(data))
  }

  firebaseWrapper.prototype.registerPaid = function(username) {
    this.updateAttribute(username, { pledged: true });
  }

  firebaseWrapper.prototype.setPledgeHonoured = function(username) {
    this.updateAttribute(username, { honoured: true });
  }

  firebaseWrapper.prototype.updateAttribute = function(username, attribute) {
    var userDataRef = this.db.child(username);
    userDataRef.limitToLast(1).once("value", function(snapshot) {
      var key = Object.keys(snapshot.val())[0];
      var pledgeRef = userDataRef.child(key);
      pledgeRef.update(attribute);
    })
  }

  firebaseWrapper.prototype.getAllPledges = function(callback) {
    this.db.once("value", function(data){
      callback(data.val());
    })
  }

  function mergeData(data) {
    data.benefactor = "Ted Cruz";
    data.created    = Date.now();
    data.due_data   = Date.now() + (1000 * 60 * 60 * 24 * 30);
    data.pledged    = false;
    data.honoured   = false;
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
//     codewars_username: "another_username",
//     description: "I will get to 100 points in Haskell",
//     language: "Haskell",
//     score: 100,
//     twitter: "@guacamolay"
//   }
// )
//
// fb.registerPaid('another_username');
// fb.setPledgeHonoured('another_username');
fb.getAllPledges(console.log.bind(console));
