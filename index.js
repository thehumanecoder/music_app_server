const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect("mongodb://127.0.0.1:27017/musicApp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is connected");
    })
mongoose.now("error", err => {
    console.log("Error in connecting mongodb", err);
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({
    extended: true
}));

const routes = require('./routes/routes');

app.use('/v1/', routes);


app.listen(config.PORT, () => {
    console.log("App has been started on port : ", config.PORT);
});