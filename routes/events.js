var express = require('express'),
     router = express.Router();

var Category  = require("../models/category"),
    Events    = require("../models/events");
    User      = require("../models/register");

router.get('/show/:category', (req, res)=>{
    Category.findOne({title: req.params.category}).populate("events").exec((err, cato)=>{
        if(err){
            console.log(err);
        } else {
            // console.log(cato);
            res.render("oneeve", {catoevents: cato.events});
        }
    })
});

router.get("/details/:id", (req, res)=>{
        Events.findById(req.params.id, (err, event)=>{
            if(err){
                console.log(err);
            } else {
                    // console.log(event);
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
            // console.log(req.params.id);
            user.events.push(req.params.id);
            user.save();
            console.log(req.user);
            // res.redirect("/details/"+req.params.id);
            res.redirect("/show/cultural");
        }
    })
});
router.get("/description", (req, res) => {
   res.render("details"); 
});
router.get('/sports', function(req, res, next) {
    res.render("details");
  });

router.get('/error', function(req, res, next) {
    console.log(req.flash);
    res.send("han han");
});

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
       return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = router;