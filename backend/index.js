const express = require('express');
const dbx = require('./routes/Dropbox.js');


const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/dropbox', dbx);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));