require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const {isValidRequest, validateRequest} = require('./util/helpers');
const routes = require("./controllers/mainController.js");

//todo: this is breaking glitch
// process.env.domains = JSON.parse(process.env.ALLOWED_DOMAINS);
// process.env.domains = JSON.parse(process.env.ALLOWED_DOMAINS);

const port = process.env.PORT || 4000;
app.set('port', (port));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//set up router
app.use('/api/v1', routes);

//middleware to validate request
app.use(isValidRequest);


app.listen(app.get('port'), function () {
    console.log(`Example app listening on portz ${port}!`)
});