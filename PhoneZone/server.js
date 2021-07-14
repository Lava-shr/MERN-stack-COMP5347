const cors = require('cors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');


var surveyRouter = require('./app/routes/server.routes');
var app = express();
app.use(cors());
app.options('*', cors());

app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use('/', surveyRouter);


app.listen(8000, function() {
    console.log('survey app is listening on port 8000!');
});

