var express = require('express');
var router = express.Router();
var passport = require('passport');

var Category  = require("../models/category"),
    Events    = require("../models/events");
    User      = require("../models/register");

router.get("/register", loggedIn,(req, res) => {
    var data ={
        name1: '',
        name2: '',
        email: '',
        college: '',
        gender: '',
        city: '',
        phone:'',
        errorMessages: []
    }
    res.render("signup-in", data);
});

router.post("/register",(req, res) => {
    req.checkBody('name1', 'You must have a name').notEmpty();
    req.checkBody('name2', 'You must have a name').notEmpty();
    req.checkBody('email', 'Email is empty').isEmail().notEmpty();
    req.checkBody('college', 'You must be in college').notEmpty();
    req.checkBody('gender', 'Specify Gender').notEmpty();
    req.checkBody('city', 'Must not be a vagabond').notEmpty();
    req.checkBody('phone', 'Enter valid phone number').notEmpty();
    req.checkBody('password', 'Enter valid Password').notEmpty();
    req.checkBody('confirm-password', 'password confirmation fails').equals(req.body.password).notEmpty();

    var errors = req.validationErrors();
    if(errors){
        req.flash('registrationError', errors);
        console.log(req.flash('registrationError'));
        res.render("signup-in",{
            name1: req.body.name1,
            name2: req.body.name2,
            email: req.body.email,
            gender: req.body.gender,
            college: req.body.college,
            city: req.body.city,
            phone: req.body.phone,
            errorMessages: errors
        })
        // res.render("register");
    } else {
        var fullname = req.body.name1+" "+req.body.name2;
        // console.log("full name: ", fullname);
        var newUser = new User({
            name: fullname,
            username: req.body.email,
            college: req.body.college,
            city: req.body.city,
            phone: req.body.phone,
            gender: req.body.gender,
            payment: "",
            password: req.body.password
        });
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                // console.log(err.message);
                req.flash('existingUsername', "Entered email is already registered");
                res.render("signup-in",{
                    name1: req.body.name1,
                    name2: req.body.name2,
                    email: req.body.email,
                    college: req.body.college,
                    gender: req.body.gender,
                    gender: req.body.gender,
                    city: req.body.city,
                    phone: req.body.phone
                });
            } else {
                passport.authenticate("local")(req, res, function(){
                    // console.log(req.session);
                    res.redirect("/events");
                })
            }
        })
    }
});

router.get("/dashboard", isLoggedin,(req, res)=>{
    if(req.user){
        User.findById(req.user._id).populate("events").exec((err, eve) => {
         if(err){
            console.log(err);
         } else {
            // console.log(eve);
            res.render("dashboard", {user: req.user, eventList: eve.events});
          }
        });        
    } else {
        res.render("dashboard");
    }

});

// router.get("/data", (req, res)=>{
//   User.find({}).populate("events", 'name').exec((err, eve) => {
//         if(err){
//             console.log(err);
//         } else {
//             // console.log(eve);
//             res.json(eve);
//         }
//     }) 
// });

router.post("/login", loggedIn ,passport.authenticate('local',
    {
        successRedirect: '/events',
        failureRedirect: "/register",
        failureFlash: "Incorrect username or password",
        successFlash: "Welcome to cosmo carnival"
    }), (req, res)=>{
        // console.log(req.session);
});

router.get('/logout', (req, res)=>{
    // console.log(req.user);
    req.logout();
    res.redirect("/");
});

function isLoggedin(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }  
  res.redirect("/register");
}

function loggedIn(req, res, next){
    if(req.user){
        res.redirect("/dashboard");
    } else {
        return next();
    }
}

module.exports = router;