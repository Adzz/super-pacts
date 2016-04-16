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
const pledgeFeed = require('./lib/pledgeFeedReader');

if (!secrets || !secrets.accountID || !secrets.accessToken) {
  console.error('Missing parameters, check your secrets.json');
  process.exit();
}

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res)=>{
  firebaseClient.getAllPledges((data) => {
    const pledges = pledgeFeed(data);
    res.render("index", { pledges });
  });
});

app.get('/all', (req, res) => {
});

app.post("/pact", (req, res)=>{

});


app.get("/fails", (req, res) => {
  const accountID = secrets.accountID;
  const accessToken = secrets.accessToken;

  const options = {
    url: "https://api.getmondo.co.uk/transactions?account_id=" + accountID,
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
  request(options, (err, response, body) => {
    res.json(JSON.parse(body)); });
});

app.get('/seed', (req, res) => {
  console.log(req.query);
  const username = req.query.username || 'ptolemybarnes';
  const amount = (req.query.amount && JSON.parse(req.query.amount)) || 10;
  const codewars_username = req.query.codewars_username || 'ptolemybarnes';
  const description = req.query.description || 'I will get to 500 points in Clojure';
  const language = req.query.language || 'clojure';
  const pledged = false;
  const score = (req.query.score && JSON.parse(req.query.score)) || 100;
  const twitter = req.query.twitter || '@guacamolay';

  const pledgeParams = {
    username,
    amount,
    codewars_username,
    description,
    language,
    pledged,
    score,
    twitter
  }

  firebaseClient.createPledge(pledgeParams);
  res.send('New user created:', pledgeParams);
});

app.post('/makepledge', (req, res) => {
  firebaseClient.createPledge(req.body);
  res.redirect('/');
});

app.post('/mondofeed', (req, res) => {
  const notes = req.body.data.notes;
  firebaseClient.registerPaid(notes);
  res.sendStatus(200);
});

app.listen(8080, () => {
  console.log('Application started on port 8080');
});
