var mongoose = require('mongoose'),
    User     = require('./models/register'),
    Event    = require('./models/events');

var data = {
    name: "kabhi kabhi",
    email: "shitshit@gmail.com",
    college: "scsc",
    city: "sccscefmkem",
    phone: "15484",
    gender: "5151515",
    password: "fdfdf"
}

seedRegister = () => {
    // User.remove({}, (err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed user")
    //     Event.remove({}, (err)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed events");
    //         User.create(data, (err, user)=>{
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 console.log("user added");
    //                 console.log(user);
                    
    //                 // Event.create(
    //                 //     {
    //                 //         name
    //                 //     }
    //                 // )
    //             }
                
    //         })
    //     })
    // })
    User.create(data, (err, saved)=>{
        if(err){
            console.log(err);
            
        }else{
            console.log(saved);
            
        }
    })
}

module.exports = seedRegister;