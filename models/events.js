var mongoose = require('mongoose');

//Schema for events
var eventSchema = new mongoose.Schema(
    {
        name: String,
        img: String,
        price: {type: Number},
        description:String
    }
)

module.exports = mongoose.model("Event", eventSchema);