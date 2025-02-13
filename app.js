
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const url = "mongodb://127.0.0.1:27017/a3-cs4241";

const routes = require('./routes/index');

const app  = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}));
app.use(passport.initialize()); 
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use((req, res, next) => {
    fullURL = `http://${req.hostname}${req.originalUrl}`
    console.log( `${req.method} ${fullURL}` );
    next();
});

const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect(url).then(() => console.log("Connection to MongoDB established!"));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
