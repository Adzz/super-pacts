const Twit = require('twit')

Twit.prototype.sendFailureMessage = function(handle) {
  this.post('statuses/update', { status: '.' + handle + ' just donated £50 to Ted Cruz, what a dick' }, function(err, data,res) {
    console.log(data);
  })
}

const T = new Twit({
  consumer_key: 'TFPseWmz85EDXnmGcEYxZ7gFE',
  consumer_secret: '0NZshRBV87GhkCYXA1u1qppI8ssyHI3Qq5rkk309WUE4n1KAqj',
  access_token: '721630475148730368-iMskDeFiwt9z6g1DPOUfeGH7ytQxPON',
  access_token_secret: 'ei9ffvAoBMrNSmKwg2lg6v1oUhG4zDH7278po6VxcD9p0'
});

// T.post('statuses/update', { status: 'hello mondo! #mondohack #mondo'}, function(err, data, res) {
//   console.log(data);
// })

T.sendFailureMessage('@ItizAdz')


module.exports = T;
