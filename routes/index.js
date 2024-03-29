var express = require('express');
var router = express.Router();
var Category = require('../models/category'),
    Event    = require('../models/events'),
    User     = require('../models/register');

//FOR ROUTER MIDDLEWARE FOLLOW https://expressjs.com/en/guide/using-middleware.html


// router.get("/url", (req, res) => {
//   console.log(req.protocol + '://' +req.get('host')+req.originalUrl);
//   console.log(req.protocol)
//   // res.json(req.protocol + '://' +req.get('host')+req.path);
//   res.send(req);
// });

router.get('/', (req, res)=>{
  res.render('index1');
});

router.get("/contact", (req, res) => {
  res.render("contact");
})

router.get("/events", (req, res)=>{
  res.render("events")
});

router.get("/sponsors2k18", (req, res)=>{
  res.render("sponsors");
});

router.get("/sponsors", (req, res)=>{
  res.render("sponsorsnew");
});

// router.get("/user", (req, res)=>{
//   if(req.user){
//     res.json(req.user);
//   } else {
//     res.json("bht chul h");
//   }
// });

router.get("/gallery", (req, res) => {
  res.render("gallery");
});

router.get("/team", (req, res)=>{
  res.render("team");
});

router.get("/aboutus", (req, res)=>{
  res.render("about");
});

router.get("/coming", (req, res) => {
  res.render("coming");
});

router.get("/sponsorship", (req, res)=>{
  res.render("sponsorcontact");
});
router.get("/addsponsor", (req, res)=>{
  res.render("addsponsor");
});
router.get("/pronite", (req, res)=>{
  res.render("pronight");
});


function isLoggedin(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }  
  res.redirect("/register");
}

module.exports = router;
