const _ = require('lodash');

module.exports = {
  displayMostUrgentPledges: displayMostUrgentPledges,
  filterPledgesDueToday: filterPledgesDueToday
}

function flattenPledges(pledges) {
  return _.flatten(_.map(pledges, _.values));
}

function displayMostUrgentPledges(pledges) {
  const allPledges = flattenPledges(pledges)
  const futurePledges = _.filter(allPledges, p => p.due_data > new Date().getTime());
  const closestToDeadline = _.reverse(_.sortBy(futurePledges, p => p.due_data));
  return closestToDeadline;
}

function filterPledgesDueToday(pledges) {
  const allPledges = flattenPledges(pledges);
  const dueToday = _.filter(allPledges, p => new Date(p.due_data).getDay() === new Date().getDay()  )
  return dueToday
}
