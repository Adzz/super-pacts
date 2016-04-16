const express = require("express");

const app = express();

app.get("/", (req, res)=>{
  res.send("Whatup");
});

app.get("/fails", (req, res)=>{
  res.send(200);
});

app.listen(8080);
