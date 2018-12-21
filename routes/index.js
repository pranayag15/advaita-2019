var express = require('express');
var router = express.Router();
var Category = require('../models/category'),
    Event    = require('../models/events'),
    User     = require('../models/register');

//FOR ROUTER MIDDLEWARE FOLLOW https://expressjs.com/en/guide/using-middleware.html

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/main', (req, res)=>{
  res.render('index1');
});

router.get("/contact", (req, res) => {
  res.render("contact");
})

router.get("/events", (req, res)=>{
  res.render("events")
});

router.get("/user", (req, res)=>{
  if(req.user){
    res.json(req.user);
  } else {
    res.json("kuch nhi hai bhai");
  }
});



router.get("/team", (req, res)=>{
  res.render("team");
});

module.exports = router;
