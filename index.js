'use strict'

const express = require("express");
const handlebars = require("express-handlebars");
const request = require('request')
const createFirebaseClient = require('./lib/firebaseWrapper');
const firebaseClient = new createFirebaseClient();
const bodyParser = require('body-parser');
const secrets = require('./secrets.json');
const _ = require('lodash');
const app = express();
const pledgeFeed = require('./lib/pledgeFeedReader').displayMostUrgentPledges;
const todayPledgeFeed = require('./lib/pledgeFeedReader').filterPledgesDueToday;
const twitterClient = require('./lib/peepPeep');

const tweeter = new twitterClient({
  consumer_key: 'TFPseWmz85EDXnmGcEYxZ7gFE',
  consumer_secret: '0NZshRBV87GhkCYXA1u1qppI8ssyHI3Qq5rkk309WUE4n1KAqj',
  access_token: '721630475148730368-iMskDeFiwt9z6g1DPOUfeGH7ytQxPON',
  access_token_secret: 'ei9ffvAoBMrNSmKwg2lg6v1oUhG4zDH7278po6VxcD9p0'
});
const moment = require("moment");

if (!secrets || !secrets.accountID || !secrets.accessToken) {
  console.error('Missing parameters, check your secrets.json');
  process.exit();
}

const exphbs = handlebars.create({
  helpers: {
    daysRemaining: (date) => {
      const start = moment(Date.now());
      const end   = moment(date);
      const difference =  end.diff(start, 'days')
      const suffix = difference > 1 ? 'days' : 'day';
      return difference + " " + suffix;
    }
  }
});
app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
  firebaseClient.getAllPledges((data) => {
    const pledges = pledgeFeed(data);
    res.render("index", { pledges });
  });
});

app.get('/home', (req, res) => {
  firebaseClient.getPledgesFor("ptolemybarnes", (pledges) => {
    res.render("home", { pledges });
  });
});

app.get('/admin', (req, res) => {
  firebaseClient.getAllPledges( data => {
    const pledges = todayPledgeFeed(data);
    res.render('home', { pledges });
  });
});

app.post('/makepledge', (req, res) => {
  firebaseClient.createPledge(req.body);
  res.redirect('/');
});

app.post('/mondofeed', (req, res) => {
  const notes = req.body.data.notes;
  routeMondoHooks(notes);
  res.sendStatus(200);
});

function routeMondoHooks(notes) {
  if (!notes) { return console.error('No codewars username was provided'); }
  const user = _.words(notes)[0];

  if (_.endsWith(notes, 'fulfilled')) {
    console.log(user + ' has met their goal!');
    return firebaseClient.setPledgeHonoured(user);
  } else if (_.endsWith(notes, 'failed')) {
    console.log(user + ' has failed to meet their pledge');
    firebaseClient.getLastPledgeFor(user, data => {
      const amount = data.amount;
      const twitter = data.twitter;
      tweeter.sendFailureMessage(twitter, amount)
    });
  } else {
    console.log(user + ' has paid their pledge');
    firebaseClient.registerPaid(user);
  }
}

app.listen(8080, () => {
  console.log('Application started on port 8080');
});
