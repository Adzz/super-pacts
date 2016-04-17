const _ = require('lodash');
const Twit = require('twit');

const twatRandom = () => {
  return _.sample(['what a dick!', 'how\'s that for moronic?!', 'what\'s wrong with them?!', '#stoneage', '#greatbigmotherfuckingmoron', 'thanks for ruining America'])
}

Twit.prototype.sendFailureMessage = function(handle, value) {
  this.post('statuses/update', { status: '.' + handle + ' just donated £' + value + ' to @tedcruz, ' + twatRandom() });
};

// const T = new Twit({
//   consumer_key: 'TFPseWmz85EDXnmGcEYxZ7gFE',
//   consumer_secret: '0NZshRBV87GhkCYXA1u1qppI8ssyHI3Qq5rkk309WUE4n1KAqj',
//   access_token: '721630475148730368-iMskDeFiwt9z6g1DPOUfeGH7ytQxPON',
//   access_token_secret: 'ei9ffvAoBMrNSmKwg2lg6v1oUhG4zDH7278po6VxcD9p0'
// });

// T.post('statuses/update', { status: 'hello mondo! #mondohack #mondo'}, function(err, data, res) {
//   console.log(data);
// })

// T.sendFailureMessage('@ItizAdz', 50)


module.exports = Twit;
