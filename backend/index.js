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
        process.exit();
    });

app.get("/", (req, res) => res.send("Hello, this is the server!"));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
