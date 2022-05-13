const mongoose = require("mongoose");
const Component = mongoose.model(
    "Component",
    new mongoose.Schema({
        name: String,
        labels: [{
            email: String,
            domain: String,
            weight: Number,
            tags: [String],
        }]
    })
);
module.exports = Component;