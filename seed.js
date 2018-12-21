var mongoose = require('mongoose'),
    Event    = require('./models/events'),
    Category = require('./models/category');

    var events = [
        {
            name: "Acoustica",
            img: "https://images.unsplash.com/photo-1536047852989-10896cf70749?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "Best artist will surely win"
        },
        {
            name: "Cypher",
            img: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "Event full of talented people"
        },
        {
            name: "Rockathon",
            img: "https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80",
            description: "Event full of talented people"
        },
        {
            name: "Nukkad",
            img: "https://images.unsplash.com/photo-1499720843949-d9e6f318dca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "at least koi to jeet ta h"
        }
    ]

seedDB = () => {
    // Remove all data
    // Category.remove({}, (err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed categories");
    //     Event.remove({}, (err)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed events");
    //         //now add data
    //         Category.create(
    //             {
    //                 title: "cultural",
    //                 image: "cult.jpg"
    //             }, (err, category) => {
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("category added");
    //                     events.forEach((eventData)=>{
    //                         Event.create(eventData
    //                             ,(err, event)=>{
    //                                 if(err){
    //                                     console.log(err);
    //                                 } else{

    //                                     // category.events.push(event._id);
    //                                     // category.save();
    //                                     new Promise((resolve)=>{
    //                                         category.events.push(event._id);
    //                                         resolve(category);
    //                                     }).then((cato)=>{
    //                                         cato.save();
    //                                     }).catch((err)=>{
    //                                         console.log(err);
    //                                     }); 
    //                                     console.log(event._id);
    //                                 }
    //                             }
    //                         )
    //                     })
    //                 }
    //             }
    //         )     
    //     });
    // });

// **************CREATE CATEGORY*********************************

    // Category.create(
    //     {
    //         title: "cultural",
    //         image: "https://images.unsplash.com/photo-1504662880849-32592cd4884e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    //     }, (err, cate)=>{
    //         console.log(cate);
    //     }
    // )

// ************ADD DATA***********************************************************

    events.forEach((data)=>{
        Category.findOne({title: "cultural"}, (err, category)=>{
            // console.log(category);
            Event.create( data,(err, evu)=>{
                    console.log(evu);
                    category.events.push(evu._id);
                    category.save();
                    
                })
        });
    })

}

module.exports = seedDB;



