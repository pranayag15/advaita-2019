var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var registrationSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {type: String, index:true, sparse: true},
    college: {type: String, index:true, sparse: true},
    city:{type:  String, index:true, sparse: true},
    phone: {type: String, index:true, sparse: true},
    gender: {type: String, index:true, sparse: true},
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            sparse: true,
            ref: "Event"
        }
    ]
});


registrationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", registrationSchema);