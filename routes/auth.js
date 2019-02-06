var express = require('express');
var router = express.Router();
var passport = require('passport');
var checksum = require('../models/checksum');
var config = require('../config/config');

var Category  = require("../models/category"),
    Events    = require("../models/events");
    models      = require("../models/register");
    // User = models.User;

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
        var newUser = new models.User({
            name: fullname,
            username: req.body.email,
            college: req.body.college,
            city: req.body.city,
            phone: req.body.phone,
            gender: req.body.gender,
            paytmpayment: [],
            password: req.body.password
        });
        models.User.register(newUser, req.body.password, function(err, user){
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
        models.User.findById(req.user._id).populate("events").exec((err, eve) => {
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

router.get("/data", (req, res)=>{
  models.User.find({}).populate("events", 'name').exec((err, eve) => {
        if(err){
            console.log(err);
        } else {
            // res.render("data", {compData: eve});
            res.json(eve);
        }
    });
});

// router.get("/paynow", isLoggedin,(req, res)=>{
//     if(req.user){
//         models.User.findById(req.user._id).populate("events").exec((err, eve) => {
//          if(err){
//             console.log(err);
//          } else {
//             // console.log(eve);
//             res.render("try", {user: req.user, eventList: eve.events});
//           }
//         });        
//     } else {
//         res.render("try");
//     }
// });

router.post("/login", loggedIn ,passport.authenticate('local',
    {
        successRedirect: '/dashboard',
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


//****************************************** PAYMENT ROUTES STARTS ******************************************************
//  router.get('/testtxn', function(req,res){
//   console.log("in restaurant");
//   console.log("--------testtxnjs----");
// res.render('testtxn.ejs',{'config' : config});
//   });


//   router.post('/testtxn',function(req, res) {
//         // console.log("POST Order start");
//         var oid = req.user._id + req.body.ORDERID.toString(); 
//         var roid = oid + Math.floor(Math.random() * 90 + 10);
//         var eveId = oid.substring(24, 49);
//         // console.log(roid);
//         var paramlist = {
//             MID: 'ZXwCxM85479435848315',
//             INDUSTRY_TYPE_ID :  'Retail',
//             CUST_ID : req.user._id.toString(),
//             CHANNEL_ID :  'WEB',
//             WEBSITE: 'DEFAULT'
//         }
//         var paramarray = new Array();
//         for (name in paramlist)
//         {
//             paramarray[name] = paramlist[name] ;
//         }
//         // console.log("concatenated ORDER_ID ", req.user._id + req.body.ORDERID);
//         Events.findById(eveId, (err, evu)=>{
//           if(err){
//               console.log(err);
//           } else {
//             //   console.log(evu.amount);
//             //   console.log(typeof(evu.amount))
//               paramarray['TXN_AMOUNT'] = evu.amount.toString();
//                 // paramarray['TXN_AMOUNT'] ='1';
//           }
//         })
//         .then(()=>{
//             paramarray["ORDER_ID"] = roid;
//             paramarray['CALLBACK_URL'] = 'https://www.advaita.io/response';    
//             var PAYTM_MERCHANT_KEY = config.PAYTM_MERCHANT_KEY;
//             // console.log(paramarray);
//             checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) 
//             {
//               res.render('pgredirect.ejs',{ 'restdata' : result });
//             });
//             // console.log("POST Order end");            
//         })
//  });
 
// router.get('/pgredirect', function(req,res){
//     console.log("in pgdirect");
//     console.log("--------testtxnjs----");
//     res.render('pgredirect.ejs');
    
// });


// router.post('/response', function(req,res){
//   console.log("in response post");
//   var paramlist = req.body;
//         var paramarray = new Array();
//         // console.log(paramlist);
//         // console.log("haha");
//         if(checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY))
//         {
//           console.log("true");
//           if(req.body.STATUS=='TXN_SUCCESS'){
//                 models.User.findById(req.user._id, function(error, user){
//                     if(error){
//                         console.log(error);
//                     } else {
//                         var eveId = req.body.ORDERID.substring(24, 48);
//                         // console.log("Event id is here bitches ", eveId)
//                         Events.findById(eveId, function(err, event){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 // console.log(user, "\n event data \n ", event)
//                                 var newPayment = new models.Payment({
//                                     EVENTNM: event.name,
//                                     ORDERID: req.body.ORDERID,
//                                     TXNID: req.body.TXNID,
//                                     TXNAMOUNT: req.body.TXNAMOUNT,
//                                     TXNDATE: req.body.TXNDATE,
//                                     STATUS: req.body.STATUS
//                                 })
//                                 // console.log("saving object ", newPayment);
//                                 user.paytmpayment.push(newPayment);
//                                 user.save();
//                                 var paymentDetail = {
//                                     username: user.name,
//                                     eventName: event.name,
//                                     email: user.username,
//                                     ORDERID: req.body.ORDERID,
//                                     TXNID: req.body.TXNID,
//                                     TXNAMOUNT: req.body.TXNAMOUNT,
//                                     TXNDATE: req.body.TXNDATE,
//                                     STATUS: req.body.STATUS
                                    
//                                 }
//                                         for (name in paymentDetail)
//                                         {
//                                             paramarray[name] = paymentDetail[name] ;
//                                         }           
//                             }
//                         })
//                         // .then(()=>{
//                         //     console.log("inside .then() statement");
//                         //     console.log("heeeeeeeeeee");
//                         //     console.log(paramarray);
//                         //     res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//                         //     res.render('response.ejs',{ 'restdata' : "true", 'paymentDetail': paramarray}); 
//                         //     return;
//                         // })
//                     }
//                 })
//                 // .then(()=>{
//                 //     console.log("inside .then() statement");
//                 //     console.log("heeeeeeeeeee");
//                 //     console.log(paramarray);
//                 //     res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//                 //     res.render('response.ejs',{ 'restdata' : "true", 'paymentDetail': paramarray}); 
//                 //     return;
//                 // })
//           }
//         //   } else {
//             //   console.log("outside .then() statement render");
//               res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//               res.render('response.ejs',{ 'restdata' : "true" ,'paramlist' : paramlist});
//         //   }
          
//         }else
//         {
//           console.log("false");
//           res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//           res.render('response.ejs',{ 'restdata' : "false" , 'paramlist' : paramlist});
//             // res.redirect('/dashb/oard');
//         };
//  });

//****************************************** PAYMENT ROUTES ENDS ******************************************************

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