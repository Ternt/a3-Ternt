const express       = require('express');
const logger        = require('morgan');
const util          = require('./util/nodeUtil.cjs');
const parser        = require('cookie-parser');
const session       = require('express-session');
const passport      = require("passport");
const dotenv       = require('dotenv').config();

const mongodb       = require('./persistence/mongoUtil.cjs');
const pageRoutes    = require('./routes/pageRoutes.cjs');
const userRoutes    = require('./routes/userRoutes.cjs');
const cardRoutes    = require('./routes/cardRoutes.cjs');

const initApp = async () => {
    const app  = express();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(parser(process.env.EXPRESS_SESSION_SECRET));
    app.use(express.static(util.fromRoot('public')));
    app.use(session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false ,
        saveUninitialized: true ,
    }));
    app.use(passport.initialize());
    app.use(passport.session({
        maxAge: 3600,
        secure: false,
    }));
    app.use(passport.authenticate('session'));

    app.use(pageRoutes);
    app.use('/user', userRoutes);
    app.use('/card', cardRoutes);

    await mongodb.connectDatabase();

    return app;
}


module.exports = initApp;
