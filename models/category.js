var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        events: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    }
);

module.exports = mongoose.model("Category", categorySchema);