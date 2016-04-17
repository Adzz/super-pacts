// ^_^ USE LIKE THIS ^_^
//
// var firebaseWrapper = require("./lib/firebaseWrapper");
// var fb = new firebaseWrapper();
// ========================================

// EXAMPLE QUERIES:
//
// TO CREATE A PLEDGE:
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
// TO REGISTER THAT THE MOST RECENT PLEDGE FOR A USER HAS BEEN PAID:
// fb.registerPaid('another_username');
//
// TO REGISTER THAT A PLEDGE HAS BEEN HONOURED:
// fb.setPledgeHonoured('another_username');
//
// TO GET PLEDGES FOR A USER:
// fb.getPledgesFor("ptolemybarnes", console.log.bind(console));
//
// GL HAVE FUN :)

var Firebase = require('Firebase');
var _        = require("lodash");

module.exports = (function() {

  var db = new Firebase("https://super-pact.firebaseio.com/pledges");

  function firebaseWrapper() {}

  firebaseWrapper.prototype.createPledge = function(data) {
    var userDataRef = getUserRef(data.codewars_username);
    userDataRef.push(mergeData(data))
  }

  firebaseWrapper.prototype.registerPaid = function(username) {
    this.updateAttribute(username, { pledged: true });
  }

  firebaseWrapper.prototype.setPledgeHonoured = function(username) {
    this.updateAttribute(username, { honoured: true });
  }

  firebaseWrapper.prototype.updateAttribute = function(username, attribute) {
    var userDataRef = getUserRef(username);
    userDataRef.limitToLast(1).once("value", function(snapshot) {
      var key = Object.keys(snapshot.val())[0];
      var pledgeRef = userDataRef.child(key);
      pledgeRef.update(attribute);
    })
  }

  firebaseWrapper.prototype.getAllPledges = function(callback) {
    db.once("value", function(data){
      callback(data.val());
    })
  }

  firebaseWrapper.prototype.getPledgesFor = function(username, callback) {
    var userDataRef = getUserRef(username);
    userDataRef.once("value", function(data) {
      callback(_.values(data.val()));
    });
  }

  firebaseWrapper.prototype.getLastPledgeFor = function(username, callback) {
    var userDataRef = getUserRef(username);
    userDataRef.limitToLast(1).once("value", function(data) {
      callback(_.values(data.val())[0]);
    });
  }

  function mergeData(data) {
    data.benefactor = "Ted Cruz";
    data.created    = Date.now();
    data.due_data   = Date.now() + (1000 * 60 * 60 * 24 * 30);
    data.pledged    = false;
    data.honoured   = false;
    return data
  }

  function getUserRef(username) {
    return db.child(username);
  }

  return firebaseWrapper
}());


// UNCOMMENT TO TEST:
// var fb = new module.exports();
// fb.getPledgesFor("ptolemybarnes", console.log.bind(console));
