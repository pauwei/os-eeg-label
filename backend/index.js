const express = require("express");
const cors = require("cors");
const dbx = require("./routes/Dropbox.js");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/dropbox", dbx);

const db = require("./models");
const Role = db.role;

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

//Accessing path module
const path = require("path");

//Access production build
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('../frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
    });
}

app.get("/", (req, res) => res.send("Hello, this is the server!"));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/component.routes")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
