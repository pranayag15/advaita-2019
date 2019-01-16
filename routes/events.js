var express = require('express'),
     router = express.Router();

var Category  = require("../models/category"),
    Events    = require("../models/events");
    User      = require("../models/register");

// router.get('/show/:category', (req, res)=>{
//     Category.findOne({title: req.params.category}).populate("events").exec((err, cato)=>{
//         if(err){
//             console.log(err);
//         } else {
//             // console.log(cato);
//             res.render("oneeve", {catoevents: cato.events});
//         }
//     })
// });

router.get("/details/:id", (req, res)=>{
    // console.log(req.params.id);
        Events.findById(req.params.id, (err, event)=>{
            if(err){
                console.log(err);
            } else {
                    // console.log(event.description);
                    // res.json(event);
                    res.render("details", {details: event});
            }
        });
    })
router.post("/details/:id", (req, res)=>{
    // console.log(req.user);
    User.findOne({username: req.user.username}, (err, user) => {
        if(err){
            console.log(err);
        } else {
            var result = 0;
              for(var i=0; i<user.events.length; i++){
                if(user.events[i]==req.params.id){
                    result = 1;
                    break;
                }
              }                
            if(result==0){
                console.log("not found");   
                user.events.push(req.params.id);
                user.save();
            } else {
                req.flash('eventRegister', "Already Registered");
                console.log("found");
            }
            res.redirect("/details/"+req.params.id);
            // console.log(req.user);
        }
    })
});

router.get("/cultural", (req, res)=>{
  res.render("cultural");
});

router.get("/technical", (req, res)=>{
  res.render("technical");
});

router.get("/theatre", (req, res)=>{
  res.render("theatre");
});

router.get("/sports", (req, res)=>{
  res.render("sports");
});

router.get("/photography", (req, res)=>{
  res.render("photography");
});

router.get("/description", (req, res) => {
   res.render("details"); 
});

router.get('/error', function(req, res, next) {
    console.log(req.flash);
    res.send("han han");
});

router.get('*', (req, res) => {
   res.render("error"); 
});

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
       return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = router;