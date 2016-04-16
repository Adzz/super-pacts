const express = require("express");
const handlebars = require("express-handlebars");


const app = express();

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.get("/", (req, res)=>{
  res.render("index");
});

app.get("/fails", (req, res)=>{
  res.send(200);
});

app.listen(8080);
