var mongoose = require('mongoose'),
    Event    = require('./models/events'),
    Category = require('./models/category');

    var events = [
        {
            name: "The baker's table",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Cupcake decoration competition."
        },
        {
            name: "Shole parathe",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Fastest parathe eating competition."
        },
        {
            name: "Maggie chef ",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Maggie making competition."
        },
        {
            name: "Golgappe king",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Golgappe eating competition."
        },
        {
            name: "Taste buddy ",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Tasting food and predicting recipe."
        },
        {
            name: "Stringed delicacy",
            img: "/images/bacground/food.jpg",
            price: 0,
            description: "Hanging food and eating contest with blindfold and other dares."
        }
    ]

foodDB = () => {


// **************CREATE CATEGORY*********************************

    // Category.create(
    //     {
    //         title: "food",
    //         image: ""
    //     }, (err, cate)=>{
    //         console.log(cate);
    //     }
    // )

// ************ADD DATA***********************************************************

    events.forEach((data)=>{
        Category.findOne({title: "food"}, (err, category)=>{
            // console.log(category);
            Event.create( data,(err, evu)=>{
                    console.log(evu);
                    category.events.push(evu._id);
                    category.save();
                    
                })
        });
    })

}

module.exports = foodDB;
