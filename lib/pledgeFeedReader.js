const _ = require('lodash');

module.exports = displayMostUrgentPledges;

function displayMostUrgentPledges(pledges) {
  const allPledges = _.flatten(_.map(pledges, _.values));
  const futurePledges = _.filter(allPledges, p => p.due_data > new Date().getTime());
  const closestToDeadline = _.reverse(_.sortBy(futurePledges, p => p.due_data));
  return closestToDeadline;
}
