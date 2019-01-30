var express = require('express'),
     router = express.Router();

var Category  = require("../models/category"),
    Events    = require("../models/events");
    model      = require("../models/register"),
    User = model.User;

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
//ADD EVENT TO DASHBOARD
router.post("/details/:id", isLoggedin,(req, res)=>{
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
                // console.log("not found");   
                user.events.push(req.params.id);
                user.save();
            } else {
                req.flash('eventRegister', "Already Registered");
                // console.log("found");
            }
            res.redirect("/details/"+req.params.id);
            // console.log(req.user);
        }
    })
});
//DELETE REGISTERED EVENT
router.post("/dlt/:id", function(req, res){
    User.findOne({username: req.user.username}, (err, user) => {
        if(err){
            console.log(err);
        } else {
            var i = user.events.indexOf(req.params.id);
            console.log(i);
            user.events.splice(i, 1);
            user.save();
            res.redirect("/dashboard");
        }
    })
});

router.get("/cultural", (req, res)=>{
  res.render("cultural");
});

router.get("/technical", (req, res)=>{
  res.render("technical");
});

router.get("/art", (req, res)=>{
  res.render("art");
});

router.get("/sports", (req, res)=>{
  res.render("sports");
});

router.get("/foodfest", (req, res)=>{
  res.render("foodfest");
});

router.get("/description", (req, res) => {
   res.render("details"); 
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