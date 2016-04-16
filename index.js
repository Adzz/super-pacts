'use strict'

const express = require("express");
const handlebars = require("express-handlebars");
const request = require('request')
const createFirebaseClient = require('./lib/firebaseWrapper');
const firebaseClient = new createFirebaseClient();
const bodyParser = require('body-parser');

const app = express();

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
  res.render("index");
});

app.post("/pact", (req, res)=>{

});

const accountID = "acc_000097FmTS5YV5JkSUhapF";
const accessToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5NFB2SU5ER3pUM2s2dHo4anAiLCJleHAiOjE0NjA5ODE5NTUsImlhdCI6MTQ2MDgwOTE1NSwianRpIjoidG9rXzAwMDA5N0Z4MWJpV0N2dGZRYWZwN0IiLCJ1aSI6InVzZXJfMDAwMDk2RmFTbUlhZDFUZTRZSGRGaCIsInYiOiIyIn0.H8aYQZk5Z-KFec6SlJCP0q_8rFvhXYX3zLKldCQi4UI";

const options = {
  url: "https://api.getmondo.co.uk/transactions?account_id=" + accountID,
  headers: {
    "Authorization": "Bearer " + accessToken
    }
};

app.get("/fails", (req, res) => {
  request(options, (err, response, body) => {
    res.json(JSON.parse(body)); });
});

app.post('/mondofeed', (req, res) => {
  console.log(req.body.data);
  const transactionId = req.body.data.id;
  res.send(200);
});

app.listen(8080);

function cleanMondoResponse (payload) {
}

