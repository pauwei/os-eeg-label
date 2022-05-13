const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        fname: String,
        lname: String,
        assoc: String,
        edu: String,
        exp: String,
        domain: String,
        weight: Number,
        email: String,
        password: String,
        components: [String],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    })
);
module.exports = User;
