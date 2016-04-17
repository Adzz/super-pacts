const firebaseWrapper = require("./firebaseWrapper");
const fb = new firebaseWrapper();
const R = require('ramda');

var filterAndSum = R.compose(R.sum, R.map(R.prop('amount')), R.filter(notHonoured), R.filter(filterNotActive));

function totalDonated(pledges) {
  return filterAndSum(pledges);
}

function filterNotActive(pledge) {
  return pledge.due_data < Date.now()
}

function notHonoured(pledge) {
  return !pledge.honoured;
}

function tracer(value) {
  console.log(value);
  return value;
}

module.exports = totalDonated;
