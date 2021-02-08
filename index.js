const express = require ("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/TODO_APP')
.then(() => console.log("Connected to mongodb"))
.catch(err => console.error("Could not connect to mongodb", err));


const port = process.env.PORT || 5050
 app.listen(port, () => console.log('Listening on port 5050'));


