const path = require("path");
const express = require("express");
const cors = require("cors");
const dbx = require("./routes/Dropbox.js");
require("dotenv").config()

const app = express();

let corsOptions = {
    origin: process.env.NODE_ENV !== "production" ? "http://localhost:3000" : [
        "https://icmobi.org",
        "https://www.icmobi.org",
        "https://icmobi.herokuapp.com"
    ],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/dropbox", dbx);

const db = require("./models");

db.mongoose
    .connect(process.env.MONGOATLASURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error.", err);
        //process.exit();
    });

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/component.routes")(app);
require("./routes/mail.routes")(app);

if (process.env.NODE_ENV === "production") {
    console.log("Serving static frontend.")
    app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
    });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
