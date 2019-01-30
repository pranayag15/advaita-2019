var schema = require('./payment');
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var paymentSchema = new mongoose.Schema({
    EVENTNM: String,
    ORDERID: String,
    TXNID: String,
    TXNAMOUNT: String,
    TXNDATE: String,
    STATUS: String
});
var payment = mongoose.model("Payment", paymentSchema);

var registrationSchema = new mongoose.Schema({
    username: String,
    password: String,
    payment: String,
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
    ],
    paytmpayment: [paymentSchema]
});


registrationSchema.plugin(passportLocalMongoose);

 var User = mongoose.model("User", registrationSchema);
var Payment = mongoose.model("Payment", paymentSchema);

// module.exports = {
//     user: function() { return User; },
//     hello: function() {return payment;}
// }

module.exports = {Payment: Payment, User: User};