'use strict'

const express = require("express");
const handlebars = require("express-handlebars");
const request = require('request')
const createFirebaseClient = require('./lib/firebaseWrapper');
const firebaseClient = new createFirebaseClient();
const bodyParser = require('body-parser');
const secrets = require('./secrets.json');
const app = express();

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
  res.render("index");
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
