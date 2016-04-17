var firebaseWrapper = require("./lib/firebaseWrapper");
var fb = new firebaseWrapper();

[{
  amount: 10,
  codewars_username: "ptolemybarnes",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: "@guacamolay"
},
{
  amount: 15,
  codewars_username: "michaelennox",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: "@michaelctlennox"
},
{
  amount: 10,
  codewars_username: "giamir",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: "@giamir"
},
{
  amount: 10,
  codewars_username: "gareth4192",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: ""
},
{
  amount: 10,
  codewars_username: "hibreez",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: ""
},
{
  amount: 10,
  codewars_username: "gimi-q",
  description: "I will get to 100 points in Haskell",
  language: "Haskell",
  score: 100,
  twitter: "@Gimiq"
},
{
  amount: 10,
  codewars_username: "deniseyu",
  description: "I will get to 100 points in Clojure",
  language: "clojure",
  score: 100,
  twitter: "@deniseyu21"
},
{
  amount: 10,
  codewars_username: "Adzz",
  description: "I will get to 100 points in CoffeeScript",
  language: "coffeescript",
  score: 100,
  twitter: "@guacamolay"
}
].forEach(fb.createPledge)

