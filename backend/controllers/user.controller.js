const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Guest Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.userList = (req, res) => {
    User.find({}, (err, data) => {
        res.send(data);
    });
}