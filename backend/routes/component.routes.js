const controller = require("../controllers/component.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/components/submit", controller.submit);

    app.get("/api/components/component", controller.getComponent);

    app.get("/api/components/complist", controller.componentList);
};
