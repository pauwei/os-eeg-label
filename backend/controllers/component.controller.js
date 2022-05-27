const db = require("../models");
const Component = db.component;
const User = db.user;

exports.submit = (req, res) => {

    const label = {
        email: req.body.email,
        domain: req.body.domain,
        weight: req.body.weight,
        tags: req.body.tags,
    };

    //Success message
    let message = { componentMessage: {}, userMessage: {}}

    //Save to Component
    let query = { name: req.body.name },
        update = { $push: { labels: label } },
        options = { new: true, upsert: true };

    Component.findOneAndUpdate(query, update, options, (error, success) => {
        if (error) {
            res.send(error);
        } else {
            message.componentMessage = success;
        }
    });

    //Save to User
    query = { email: req.body.email },
    update = { $push: { components: [req.body.name] } },
    options = { new: true };

    User.findOneAndUpdate(query, update, options, (error, success) => {
        if (error) {
            res.send(error);
        } else {
            message.userMessage = success;
        }
    });

    res.send(message);
};

exports.getComponent = (req, res) => {
    Component.findOne({ name: req.query.name}, (error, data) => {
        if (error) {
            res.send(error);
            return;
        }

        res.send(data);
    })
}

exports.componentList = (req, res) => {
    Component.find({}, (err, data) => {
        res.send(data);
    });
}