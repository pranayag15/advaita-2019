var mongoose = require('mongoose'),
    Event    = require('./models/events'),
    Category = require('./models/category');

    var events = [
        // {
        //     name: "Collart",
        //     img: "/images/bacground/art.jpg",
        //     price: 2,
        //     amount: 100,
        //     link: "",
        //     description: "MAKE THE BEST OUT OF WASTE"
        // },
        // {
        //     name: "COFFEE PAINTING WORKSHOP",
        //     img: "/images/bacground/art.jpg",
        //     price: 0,
        //     amount: 0,
        //     link: "",
        //     description: "Would you like to explore your creative side? Here is your opportunity to come and express yourself with no boundaries!! Hop on to explore coffee painting and unleash your ideas into paper for free!!"
        // },
        // {
        //     name: "EMBROIDERY WORKSHOP",
        //     img: "/images/bacground/art.jpg",
        //     price: 0,
        //     amount: 0,
        //     link: "",
        //     description: "Are you bored of painting on paper or canvas or any such medium? If yes then the time has come to shift to the trending medium - fabric."+
        //                  "<br><br>In Advaita'19 Paracosm, in association with Pidilite, presents a workshop on fabric painting. We welcome everyone to attend this fresh and anomalous workshop of drawing and painting on the fabric. The medium will be new and exciting to work upon."+
        //                  "<br><br>The attendees shall retain their brand new magnum opus. The attendees will be mentored and instructed by the Pidilite accredited Experts."
        // },
        // {
        //     name: "Face Painting",
        //     img: "/images/bacground/art.jpg",
        //     price: 2,
        //     amount: 100,
        //     link: "",
        //     description: "Old are the days when we used to paint and colour on the papers.In Advaita'19, Paracosm presents FACE PAINTING where you all get the chance to paint your faces or your friend’s face silly and let your imagination unleash."+
        //                 "<br><br>P.S. - The colours provided by us are absolutely skin friendly."
        // },
        // {
        //     name: "MYSTERY BOX",
        //     img: "/images/bacground/art.jpg",
        //     price: 3,
        //     amount: 150,
        //     link: "",
        //     description: "Mystery Box is for innovators, drawing on the challenge we all face everyday - using limited resources to create something extraordinary. The ordinary and diverse items in the kit are transformed into something remarkable. There are no instructions, just a few rules to make things interesting."+
        //                  "<br><br>You get an engaging experience that opens you up to new materials, techniques, and ways of thinking. As you find unexpected solutions and creative alternatives, you'll get an artistic workout and discover new talents and abilities."+
        //                  "<br><br>The kit includes all the materials you need to complete your project and compete for prizes, and it’s ridiculously fun."
        // }
        {
            name: "Imagen",
            img: "/images/bacground/art.jpg",
            price: 0,
            amount: 0,
            link: "https://docs.google.com/document/d/1Iv5o1lF48fpa2nC_eEVRSvNnC6_rjq0dIo7AH81xMP8/mobilebasic",
            description: "Bring out the photographer in you. A great stage to showcase your talent. Dont miss out the opportunity."
        },
        {
            name: "Picasso",
            img: "/images/bacground/art.jpg",
            price: 0,
            amount: 0,
            link: "",
            description: "Picasso is the annual painting competition conducted by Photogeeks. Photogeeks believe in creating magic with not just cameras but brushes as well. Nothing can replace the sheer beauty of a painting. So grab your brushes, switch your creative modes on and let the colours speak of your behalf."
        }
    ]

artDB = () => {
// **************CREATE CATEGORY*********************************

    // Category.create(
    //     {
    //         title: "art",
    //         image: ""
    //     }, (err, cate)=>{
    //         console.log(cate);
    //     }
    // )

// ************ADD DATA***********************************************************

    events.forEach((data)=>{
        Category.findOne({title: "art"}, (err, category)=>{
            // console.log(category);
            Event.create( data,(err, evu)=>{
                    console.log(evu);
                    category.events.push(evu._id);
                    category.save();
                    
                })
        });
    })

}

module.exports = artDB;
